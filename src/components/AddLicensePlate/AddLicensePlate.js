import css from './AddLicensePlate.module.css';
import { Link } from 'react-router-dom';
import backArrow from '../icons/backArrow.svg';
import dealerPhoto from '../icons/dealerPhoto.svg';
// import brownCross from '../icons/brownCross.svg';
import copyIcon from '../icons/copyIcon.svg';
// import bottomArrowFrom
import { useState } from 'react';

const AddLicensePlate = () => {
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [doingBusinessAs, setDoingBusinessAs] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'companyName':
        setCompanyName(value);
        break;

      case 'doingBusinessAs':
        setDoingBusinessAs(value);
        break;

      case 'number':
        setNumber(value);
        break;

      case 'email':
        setEmail(value);
        break;

      case 'address':
        setAddress(value);
        break;

      case 'contactPerson':
        setContactPerson(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = async event => {
    console.log('submitted');

    console.log('company name', companyName);
    console.log('password', generatedPassword);
    event.preventDefault();

    fetch('https://car-plates.onrender.com/api/auth/admin/add-plate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company_name: companyName,
        company_address: address,
        // logo: { type: String },
        contact_person: contactPerson,
        number: number,
        e_mail: email,
        doing_business_as: doingBusinessAs,
        password: generatedPassword,
      }),
    })
      .then(res => res.json())
      .then(res => console.log(res));

    // if (email === '' || !email.includes('@')) {
    //   return Notiflix.Notify.failure('Please, enter a valid email!');
    // }

    // if (password === '' || password.includes(' ')) {
    //   return Notiflix.Notify.failure(
    //     'Please, enter a valid password without spaces!'
    //   );
    // }

    // if (confirmedPassword !== password || confirmedPassword === '') {
    //   return Notiflix.Notify.failure('Passwords do not match!');
    // }

    // if (!/^[a-zA-Z]{2,30}/g.test(name)) {
    //   return Notiflix.Notify.info('Name may only include letters');
    // }
    // if (name === '') {
    //   return Notiflix.Notify.failure('Please, enter your name');
    // }

    // if (city === '') {
    //   return Notiflix.Notify.failure('Please, enter your city and region ');
    // }
    // if (!/^(([a-zA-Z ](,)?)*)+$/g.test(city)) {
    //   return Notiflix.Notify.info(
    //     'Please, enter your city and region separated by comma and without spaces'
    //   );
    // }
    // if (phone === '') {
    //   return Notiflix.Notify.failure('Please, enter your phone number');
    // }
    // if (!/^[+0-9]{13}$/g.test(phone)) {
    //   return Notiflix.Notify.info(
    //     'Your phone number must start with + and consist of 12 numbers'
    //   );
    // }

    // navigate('/user', { replace: true });
  };

  return (
    <>
      <section className={css.add_dealers_section}>
        <div className={css.add_dealers_admin_thumb}>
          <div className={css.back_btn_thumb}>
            <img alt="back" className={css.back_icon} src={backArrow} />

            <Link to="/license-plates">
              <button className={css.back_to_dealers_btn}>
                Back to plates
              </button>
            </Link>
          </div>
          <p className={css.add_dealer_text}>Add Plate</p>
          <form onSubmit={handleSubmit} className={css.add_dealer_blocks_thumb}>
            <div>
              <div className={css.add_dealer_company_info}>
                <div className={css.add_dealer_upload_image_thumb}>
                  <img
                    alt="dealer logo"
                    className={css.logo_icon}
                    src={dealerPhoto}
                  />
                  <p className={css.add_dealer_upload_text}> Click to upload</p>
                  <div className={css.border}></div>
                  <p className={css.add_dealer_image_size}>
                    PNG or JPG recommended size (1000px*1000px)
                  </p>
                </div>
              </div>
            </div>
            <div className={css.dealer_contact_thumb}>
              <div className={css.add_dealer_contact_person}>
                <div className={css.add_dealer_company_thumb}>
                  <p className={css.add_dealer_company_text}>
                    Plate Information
                  </p>
                  <ul className={css.add_dealer_company_list}>
                    <li className={css.company_item}>
                      <p className={css.company_label}>Name</p>

                      <input
                        className={css.company_input}
                        placeholder="Name"
                        type="text"
                        name="contactPerson"
                        onChange={handleChange}
                      />
                    </li>
                    <li className={css.company_item}>
                      <p className={css.company_label}> Choose a dealer </p>

                      <input
                        type="text"
                        name="number"
                        onChange={handleChange}
                        className={css.company_input}
                        placeholder="Start typing or select from the list"
                      />
                    </li>
                    <li>
                      <p className={css.product_description_label}>
                        Product description
                      </p>
                      <input
                        type="text"
                        name="email"
                        onChange={handleChange}
                        className={css.product_description_input}
                        placeholder="Type here"
                      />
                    </li>
                  </ul>

                  <p className={css.add_dealer_company_text}>Add Filter</p>

                  <ul className={css.add_item_filter_list}>
                    <li className={css.filter_item}>
                      <p className={css.company_label}> Choose category </p>
                      <input
                        type="text"
                        name="number"
                        onChange={handleChange}
                        className={css.filter_item_input}
                        placeholder="Start typing or select from the list"
                      />
                    </li>
                    <li className={css.filter_item}>
                      <p className={css.company_label}> Choose state </p>
                      <input
                        type="text"
                        name="number"
                        onChange={handleChange}
                        className={css.filter_item_input}
                        placeholder="Start typing or select from the list"
                      />
                    </li>
                    <li className={css.filter_item}>
                      <p className={css.company_label}> Choose status </p>
                      <input
                        type="text"
                        name="number"
                        onChange={handleChange}
                        className={css.filter_item_input}
                        placeholder="Start typing or select from the list"
                      />
                    </li>
                  </ul>

                  <p className={css.add_dealer_company_text}>
                    Add link and price
                  </p>

                  <ul className={css.add_item_filter_list}>
                    <li className={css.filter_item}>
                      <p className={css.company_label}>Shop name</p>
                      <input
                        type="text"
                        name="number"
                        onChange={handleChange}
                        className={css.filter_item_input}
                        placeholder="Amazon"
                      />
                    </li>
                    <li className={css.filter_item}>
                      <p className={css.company_label}>
                        Attach a link to the product
                      </p>
                      <input
                        type="text"
                        name="number"
                        onChange={handleChange}
                        className={css.filter_item_input}
                        placeholder="Link"
                      />
                    </li>
                    <li className={css.filter_item}>
                      <p className={css.company_label}> Price ($) </p>
                      <input
                        type="text"
                        name="number"
                        onChange={handleChange}
                        className={css.filter_item_input}
                        placeholder="0.00"
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <div className={css.add_dealer_buttons_thumb}>
                <Link to="/license-plates">
                  <button className={css.cancel_btn}>Cancel</button>
                </Link>
                <button className={css.add_dealer_btn}>Add plate</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
export default AddLicensePlate;
