import styles from  './styles.module.scss';
import format from 'date-fns/format';
import {ptBR} from 'date-fns/locale';
export function Header() {

  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {

    locale: ptBR
  })
  return(
    <header className={styles.headerContainer}>
      <img src="/logo.png" alt="cotacoes" width="200"></img>

      <h2>Cotações</h2>
      <span>{currentDate}</span>
    </header>
  );
}