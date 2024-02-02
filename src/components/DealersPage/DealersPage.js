import css from './DealersPage.module.css';
import cross from '../icons/cross.svg';
import AZFilterIcon from '../icons/AZFilterIcon.svg';

const DealersPage = () => {
  return (
    <>
      <section className={css.dealers_section}>
        <div className={css.text_thumb}>
          <p className={css.section_text}>
            Dealers <span className={css.dealers_amount}>(amount)</span>
          </p>
          <button className={css.add_dealer_btn}>
            <img alt="cross" className={css.cross_icon} src={cross} />
            Add new
          </button>
        </div>
        <div className={css.dealers_thumb}>
          <div className={css.dealers_thumb_titles}>
            <div className={css.checkbox}></div>
            <p className={css.dealers_company_title}>
              <img
                alt="companies"
                className={css.az_filter_icon}
                src={AZFilterIcon}
              />
              Company
            </p>
            <p className={css.dealers_company_title}>Сontact person</p>
            <p className={css.dealers_company_title}>Number</p>
            <p className={css.dealers_company_title}>E-mail</p>
            <p className={css.dealers_company_title}>Action</p>
          </div>
          <ul className={css.dealers_list}>
            <li></li>
          </ul>
        </div>
      </section>
    </>
  );
};
export default DealersPage;
