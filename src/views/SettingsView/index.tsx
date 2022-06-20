import { Hero, ViewContainer } from '../../layouts'
import { SettingsIcon } from '../../components/Icons'
import { version } from '../../../package.json'

export const SettingsView = () => {
  return (
    <ViewContainer>
      <Hero
        icon={<SettingsIcon />}
        title="Configuraciones"
        color="#1363DF"
        subtitle={`Acerca de Cronos ${version}`}
      />
    </ViewContainer>
  )
}
