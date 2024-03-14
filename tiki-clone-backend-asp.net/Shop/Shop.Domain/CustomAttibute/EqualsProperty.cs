using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Shop.Domain.CustomAttibute
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class EqualsPropertiesAttribute : ValidationAttribute
    {
        private readonly string otherPropertyName;

        public EqualsPropertiesAttribute(string otherPropertyName)
        {
            this.otherPropertyName = otherPropertyName;
        }

        /// <summary>
        /// So sánh 2 thuôc tính trong cùng 1 đối tượng.
        /// Nếu khác nhau trả về đối tượng validation với ErrorMessage
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult? IsValid(object value, ValidationContext validationContext)
        {
            var otherPropertyInfo = validationContext.ObjectType.GetProperty(otherPropertyName);

            if (otherPropertyInfo == null)
            {
                return new ValidationResult(ErrorMessageString);
            }

            var otherPropertyValue = otherPropertyInfo.GetValue(validationContext.ObjectInstance, null);

            if (!object.Equals(value, otherPropertyValue))
            {
                return new ValidationResult(ErrorMessageString);
            }

            return ValidationResult.Success;
        }
    }
}
