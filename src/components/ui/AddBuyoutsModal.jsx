import { useSelector } from 'react-redux'
import MuiDialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

import Icon from '@components/icon/Icon'
import CustomTextField from '@core/components/mui/TextField'
import { ZoomInfo } from '@components/icon/ZoomInfo'
import { genders } from '@/static'
import { useAddBuyoutsLogic } from '@/hooks/useAddBuyoutsLogic'

export const AddBuyoutsModal = ({ title, isOpen, onClose, type, articleIndex }) => {
  const article = useSelector(state => state.articleStore.article.articles[articleIndex])

  const {
    aggregatedKeywords,
    getAvailableSpace,
    getRemainingText,
    keywordDelete,
    saveUpdatedData,
    addNewRow,
    ItemChange
  } = useAddBuyoutsLogic(article, type, articleIndex, onClose)

  return (
    <MuiDialog aria-labelledby='dialog-title' open={isOpen} onClose={() => onClose()}>
      <div className='p-6 max-w-[400px] public-sans'>
        <div className='flex items-center justify-between mb-6'>
          <h4>{title}</h4>
          <span className='text-main-500 hover:cursor-pointer' onClick={() => onClose()}>
            <Icon type='close' width='24px' />
          </span>
        </div>
        <table className='w-full flex items-center justify-start flex-col'>
          {aggregatedKeywords.map((item, i) => (
            <tbody key={i} className='flex flex-col items-start gap-2 mt-2'>
              <tr className='w-full flex items-center gap-4'>
                <td>
                  {type === 'search_queries' && (
                    <CustomTextField
                      id={`keyword-${i}`}
                      placeholder='Поисковый Запрос'
                      value={item.keyword || ''}
                      className='!min-w-full public-sans'
                      onChange={e => ItemChange('keyword', e.target.value, i)}
                    />
                  )}

                  {type === 'size' && (
                    <CustomTextField
                      select
                      id='select-size'
                      value={item.size || ''}
                      className='!min-w-24'
                      SelectProps={{ displayEmpty: true }}
                      onChange={e => ItemChange('size', e.target.value, i)}
                    >
                      {article?.sizes?.map((size, j) => {
                        const isDisabled = aggregatedKeywords.some(
                          (keyword, index) => index !== i && keyword.size === size
                        )

                        return (
                          <MenuItem value={size} key={j} disabled={isDisabled}>
                            {size}
                          </MenuItem>
                        )
                      })}
                    </CustomTextField>
                  )}

                  {type === 'gender' && (
                    <CustomTextField
                      select
                      id='select-gender'
                      value={item.account_gender || ''}
                      className='!min-w-[73px]'
                      SelectProps={{ displayEmpty: true }}
                      onChange={e => ItemChange('account_gender', e.target.value, i)}
                    >
                      {genders.map((gender, j) => {
                        const isDisabled = aggregatedKeywords.some(
                          (keyword, index) => index !== i && keyword.account_gender === gender.value
                        )

                        return (
                          <MenuItem value={gender.value} key={j} disabled={isDisabled}>
                            {gender.label}
                          </MenuItem>
                        )
                      })}
                    </CustomTextField>
                  )}
                </td>
                <td className='flex justify-center'>
                  <div className='flex items-center gap-1 p-2 rounded-sm bg-grey-100 text-grey-800'>
                    <div
                      className='w-5 h-5 cursor-pointer flex items-center justify-center rounded-sm hover:bg-grey-600 hover:text-main-500'
                      onClick={e => {
                        e.stopPropagation()
                        ItemChange(`${type === 'search_queries' ? 'keyword' : type}_count`, '-', i)
                      }}
                    >
                      <Icon type='minus' width='12px' />
                    </div>

                    <input
                      type='text'
                      value={item.keyword_count}
                      onChange={e => {
                        const newValue = parseInt(e.target.value) || 1

                        ItemChange(`${type === 'search_queries' ? 'keyword' : type}_count`, newValue, i)
                      }}
                      className='w-12 text-sm font-medium text-center bg-transparent outline-none text-main-500'
                    />

                    <div
                      className='w-5 h-5 flex cursor-pointer items-center justify-center rounded-sm hover:bg-grey-600 hover:text-main-500'
                      onClick={e => {
                        e.stopPropagation()
                        ItemChange(`${type === 'search_queries' ? 'keyword' : type}_count`, '+', i)
                      }}
                    >
                      <Icon type='add' width='12px' />
                    </div>
                  </div>
                </td>
                <td className='text-center'>
                  <span
                    className='w-5 flex items-center justify-center border-dashed text-main-500 cursor-pointer opacity-70 hover:opacity-100'
                    onClick={() => keywordDelete(i)}
                  >
                    <Icon type='delete' width='16px' />
                  </span>
                </td>
              </tr>
            </tbody>
          ))}
          <tbody className='w-full'>
            <tr className='add_keyword mt-2 cursor-pointer flex items-center gap-2 text-main-500 hover:opacity-80'>
              <td colSpan='3' className='flex items-center gap-2' onClick={addNewRow}>
                <div className='plus_icon'>
                  <Icon type='plus' width='20px' />
                </div>
                <p className='public-sans text-primary text-[15px]'>Добавить</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='remain_requests flex items-center justify-start mt-4 gap-2'>
          <ZoomInfo />
          <p className='text-[13px] public-sans'>{getRemainingText()}</p>
          <div className='w-[24px] h-[24px] flex items-center justify-center bg-[#FFB269] rounded'>
            {getAvailableSpace()}
          </div>
        </div>
        <div className='flex items-center justify-between gap-4 mt-4'>
          <Button fullWidth variant='outlined' color='secondary' onClick={() => onClose()}>
            Вернуться
          </Button>
          <Button fullWidth variant='contained' color='primary' onClick={() => saveUpdatedData()}>
            Сохранить
          </Button>
        </div>
      </div>
    </MuiDialog>
  )
}
