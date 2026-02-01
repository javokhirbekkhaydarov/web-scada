import Dashboard from '@views/Dashboard'

import { getServerMode } from '@core/utils/serverHelpers'

export const metadata = {
  title: 'Дэшборд',
  description: 'Dashboard'
}

const DashboardPage = () => {
  const mode = getServerMode()

  return <Dashboard mode={mode} />
}

export default DashboardPage
