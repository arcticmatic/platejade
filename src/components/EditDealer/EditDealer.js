import css from './EditDealer.module.css';
import { Link } from 'react-router-dom';
import backArrow from '../icons/backArrow.svg';
import dealerPhoto from '../icons/dealerPhoto.svg';
// import brownCross from '../icons/brownCross.svg';
import copyIcon from '../icons/copyIcon.svg';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const EditDealer = () => {
  // console.log('dealer id', dealerId);
  const [searchParams] = useSearchParams();

  const [generatedPassword, setGeneratedPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [doingBusinessAs, setDoingBusinessAs] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [currentDealer, setCurrentDealer] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const [formData, setFormData] = useState({
    company_name: '',
    contact_person: '',
    doing_business_as: '',
    number: '',
    email: '',
    address: '',
    password: '',
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    const payload = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim() !== '') {
        payload[key] = value;
      }
    });
    if (generatedPassword) {
      payload.password = generatedPassword;
    }
    const dealerId = currentDealer[0]._id;
    console.log('payload', payload);

    console.log('company name', companyName);
    console.log('password', generatedPassword);
    event.preventDefault();

    fetch(
      `https://car-plates.onrender.com/api/auth/admin/edit-dealer/${dealerId}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          payload

          // company_name: companyName,
          // company_address: address,
          // // logo: { type: String },
          // contact_person: contactPerson,
          // number: number,
          // e_mail: email,
          // doing_business_as: doingBusinessAs,
        ),
      }
    )
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

  // const handleCopy = () => {
  //   console.log('click');
  // };

  const handleGeneratePassword = event => {
    event.preventDefault();
    console.log('click');
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?';
    const passwordArray = new Uint32Array(21);

    // Use window.crypto for browser or crypto module for Node.js
    window.crypto.getRandomValues(passwordArray);

    const newPassword = Array.from(passwordArray)
      .map(value => charset[value % charset.length])
      .join('');

    setGeneratedPassword(newPassword);
  };
  const currentUser = searchParams.get('dealer');
  // const getCurrentDealer = () => {};
  useEffect(() => {
    setRefresh(false);
    fetch(
      `https://car-plates.onrender.com/api/auth/admin/dealer?company_name=${currentUser}`,
      {
        method: 'GET',
        header: {},
      }
    )
      .then(res => res.json())
      .then(result => {
        setCurrentDealer(result.dealers);
      });
  }, [refresh, currentUser]);

  return (
    <>
      <section className={css.add_dealers_section}>
        {currentDealer.map(dealer => {
          return (
            <div key={dealer._id} className={css.add_dealers_admin_thumb}>
              <div className={css.back_btn_thumb}>
                <img alt="back" className={css.back_icon} src={backArrow} />

                <Link to="/">
                  <button className={css.back_to_dealers_btn}>
                    Back to dealers
                  </button>
                </Link>
              </div>
              <p className={css.add_dealer_text}>Edit Dealer</p>
              <form
                onSubmit={handleSubmit}
                className={css.add_dealer_blocks_thumb}
              >
                <div>
                  <div className={css.add_dealer_company_info}>
                    <div className={css.add_dealer_upload_image_thumb}>
                      <img
                        alt="dealer logo"
                        className={css.logo_icon}
                        src={dealerPhoto}
                      />
                      <p className={css.add_dealer_upload_text}>
                        Click to upload
                      </p>
                      <div className={css.border}></div>
                      <p className={css.add_dealer_image_size}>
                        PNG or JPG recommended size (1000px*1000px)
                      </p>
                    </div>
                    <div className={css.add_dealer_border}></div>
                    <div className={css.add_dealer_company_thumb}>
                      <p className={css.add_dealer_company_text}>
                        Company Info
                      </p>
                      <ul className={css.add_dealer_company_list}>
                        <li className={css.company_item}>
                          <p className={css.company_label}> Company name</p>

                          <input
                            type="text"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            className={css.company_input}
                            placeholder={currentDealer[0].company_name}
                          />
                        </li>
                        <li className={css.company_item}>
                          <p className={css.company_label}>Doing Business As</p>

                          <input
                            type="text"
                            name="doing_business_as"
                            value={formData.doing_business_as}
                            onChange={handleChange}
                            className={css.company_input}
                            placeholder={currentDealer[0].doing_business_as}
                          />
                        </li>
                      </ul>

                      <p className={css.company_label}> Company Address</p>

                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={css.company_input_address}
                        placeholder={currentDealer[0].company_address}
                      />
                    </div>
                  </div>
                  <div className={css.add_dealer_password_thumb}>
                    <div className={css.password_text_thumb}>
                      <p className={css.password_text}>Generate a password</p>
                      <p
                        className={css.password_description}
                        type="text"
                        name="password"
                        onChange={handleChange}
                      >
                        After generating the password, copy and send it to the
                        dealer
                      </p>
                    </div>

                    <button
                      //   disabled={generatedPassword ? true : false}
                      onClick={
                        !generatedPassword
                          ? handleGeneratePassword
                          : () => {
                              console.log('click');
                            }
                      }
                      className={
                        generatedPassword
                          ? css.password_generated_btn
                          : css.password_generate_btn
                      }
                    >
                      {generatedPassword
                        ? generatedPassword
                        : 'Generate a password'}
                      {generatedPassword ? (
                        <img
                          onClick={() =>
                            navigator.clipboard.writeText(generatedPassword)
                          }
                          alt="copy icon"
                          className={css.copy_icon}
                          src={copyIcon}
                        />
                      ) : (
                        ''
                      )}
                    </button>
                  </div>
                </div>
                <div className={css.dealer_contact_thumb}>
                  <div className={css.add_dealer_contact_person}>
                    <div className={css.add_dealer_company_thumb}>
                      <p className={css.add_dealer_company_text}>
                        Сontact person
                      </p>
                      <ul className={css.add_dealer_company_list}>
                        <li className={css.company_item}>
                          <p className={css.company_label}>Name</p>

                          <input
                            className={css.company_input}
                            placeholder="Name"
                            value={formData.contact_person}
                            type="text"
                            name={currentDealer[0].contact_person}
                            onChange={handleChange}
                          />
                        </li>
                        <li className={css.company_item}>
                          <p className={css.company_label}> Phone number</p>

                          <input
                            value={formData.number}
                            type="text"
                            name="number"
                            onChange={handleChange}
                            className={css.company_input}
                            placeholder={currentDealer[0].number}
                          />
                        </li>
                      </ul>

                      <p className={css.company_label}> E-mail</p>

                      <input
                        value={formData.email}
                        type="text"
                        name="email"
                        onChange={handleChange}
                        className={css.person_input_address}
                        placeholder={currentDealer[0].email}
                      />
                      {/*                   
                  <button
                    onClick={handleAddNewPerson}
                    className={css.add_dealer_person}
                  >
                    <img
                      alt="cross exit"
                      className={css.cross}
                      src={brownCross}
                    />
                    Add new
                  </button> */}
                    </div>
                  </div>
                  <div className={css.add_dealer_buttons_thumb}>
                    <Link to="/">
                      <button className={css.cancel_btn}>Cancel</button>
                    </Link>
                    <button className={css.add_dealer_btn}>Edit dealer</button>
                  </div>
                </div>
              </form>
            </div>
          );
        })}
      </section>
    </>
  );
};
export default EditDealer;
