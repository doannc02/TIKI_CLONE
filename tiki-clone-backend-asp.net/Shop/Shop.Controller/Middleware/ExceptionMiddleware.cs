using Shop.Domain.Exceptions;
using System.Net;
using System.Text;

namespace Shop.Controller.Middleware
{
    public class ExceptionMiddleware
    {
        #region Properties
        /// <summary>
        /// đối tượng delegate tham chiếu đến các phương thức xử lý request
        /// author: Trương Mạnh Quang (4/8/2023)
        /// </summary>
        private readonly RequestDelegate _next;
        #endregion
        #region Constructer
        /// <summary>
        /// hàm khởi tạo gọi đến phương thức tiếp theo
        /// author: Trương Mạnh Quang (4/8/2023)
        /// </summary>
        /// <param name="next"></param>
        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        #endregion

        #region Methods
        /// <summary>
        /// hàm thực thi middleware và bắt ngoại lệ
        /// author: Trương Mạnh Quang (4/8/2023)
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task Invoke(HttpContext context)
        {
            try
            {
                // thành công
                await _next(context);
            }
            catch (ResponseException ex)
            {
                // ngoại lệ cho người dùng
                await HandleExceptionAsync(context, ex);
            }
            catch (Exception ex)
            {
                // ngoại lệ do hệ thống
                Console.WriteLine(ex);
                //var logFilePath = "D:\\Shop\\Shop.Controller\\Logger\\ErrorFile.txt";
                //string msg = $"{DateTime.Now}:\n{ex.Message}\n{ex.StackTrace}";
                //File.AppendAllText(logFilePath, ex.Message,Encoding.UTF8);
                //File.AppendAllText(logFilePath, "==========================\n");
                if (!context.Response.HasStarted)
                {
                    context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                    var listUserMsg = new List<string>() { "Lỗi hệ thống" };
                    await context.Response.WriteAsync(text: new BaseException()
                    {
                        ErrorCode = ErrorCode.NoError,
                        UserMessage = listUserMsg,
                        DevMessage = ex.Message,
                        TraceId = context.TraceIdentifier,
                        MoreInfo = ex.HelpLink
                    }.ToString() ?? "");
                }
            }

        }
        /// <summary>
        /// hàm xử lý lỗi
        /// author: Trương Mạnh Quang (4/8/2023)
        /// </summary>
        /// <param name="context">đối tượng http</param>
        /// <param name="ex">ngoại lệ</param>
        /// <returns>Task base exception</returns>
        private static async Task HandleExceptionAsync(HttpContext context, ResponseException ex)
        {
            Console.WriteLine(ex);
            context.Response.ContentType = "application/json";
            switch (ex)
            {
                case BadRequestException:
                    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    await ResponseBaseException(context, ex);
                    break;
                case NotFoundException:
                    context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                    await ResponseBaseException(context, ex);
                    break;
                case NoContentException:
                    context.Response.StatusCode = (int)HttpStatusCode.NoContent;
                    await ResponseBaseException(context, ex);
                    break;
                case ConflictException:
                    context.Response.StatusCode = (int)HttpStatusCode.Conflict;
                    await ResponseBaseException(context, ex);
                    break;
                case UnauthorizedException:
                    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    await ResponseBaseException(context, ex);
                    break;
                case ForbiddenException:
                    context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    await ResponseBaseException(context, ex);
                    break;

            }
        }

        /// <summary>
        /// hàm khởi tạo và trả về lỗi cho người dùng
        /// </summary>
        /// <param name="context"></param>
        /// <param name="ex"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        /// author: Trương Mạnh Quang (4/8/2023)
        private static async Task ResponseBaseException(HttpContext context, ResponseException ex)
        {
            var listUserMsg = new List<string>() { ex.UserMessage ?? "" };
            await context.Response.WriteAsync(text: new BaseException()
            {
                ErrorCode = ex.ErrorCode,
                UserMessage = listUserMsg,
                DevMessage = ex.Message,
                TraceId = context.TraceIdentifier,
                MoreInfo = ex.HelpLink
            }.ToString() ?? "");
            return;
        }
        #endregion
    }
}
