
const textSecondary = 'var(--mui-palette-text-secondary)'
const successColor = 'var(--mui-palette-success-main)'

export const options = {
  stroke: { width: 0 },
  labels: ['Проверено', 'Не найдено'],
  colors: [
    successColor,
    '#7367F0',
    'rgba(var(--mui-palette-success-mainChannel) / 0.5)',
    'var(--mui-palette-success-lightOpacity)'
  ],
  dataLabels: {
    enabled: true,
    formatter: val => `${Math.round(val)}%`,
    fontSize: '1rem'
  },
  legend: {
    show: false
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          name: {
            fontSize: '1rem'
          },
          value: {
            fontSize: '1rem',
            color: textSecondary,
            formatter: val => `${parseInt(val, 10)}`
          },
          total: {
            show: true,
            fontSize: '1rem',
            label: 'Всего',

            color: 'var(--mui-palette-text-primary)'
          }
        }
      }
    }
  },
  responsive: [
    {
      breakpoint: 992,
      options: {
        chart: {
          height: 184
        },
        legend: {
          position: 'bottom'
        }
      }
    },
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 184
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  fontSize: '1rem'
                },
                value: {
                  fontSize: '1rem'
                },
                total: {
                  fontSize: '1rem'
                }
              }
            }
          }
        }
      }
    }
  ]
}
