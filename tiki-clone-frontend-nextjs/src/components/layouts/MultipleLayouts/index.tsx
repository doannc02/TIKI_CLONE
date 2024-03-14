import dynamic from 'next/dynamic'

const multipleLayout = {
  Layout1: dynamic(
    () =>
      import('@/components/layouts/MultipleLayouts/Layout1/index').then(
        (component) => component.Layout1
      ),
    {
      ssr: false,
      loading: () => (
        <div className='min-h-screen min-w-full'>
          <div className='flex justify-center items-center h-full mt-10'>
            <div className='loader'></div>
          </div>
        </div>
      ),
    }
  ),
  Layout2: dynamic(
    () =>
      import('@/components/layouts/MultipleLayouts/Layout2/index').then(
        (component) => component.Layout2
      ),
    {
      ssr: false,
      loading: () => (
        <div className='min-h-screen min-w-full'>
          <div className='flex justify-center items-center h-full mt-10'>
            <div className='loader'></div>
          </div>
        </div>
      ),
    }
  ),
}

export type LayoutTypes = keyof typeof multipleLayout

export default multipleLayout
