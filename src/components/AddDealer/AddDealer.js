import css from './AddDealer.module.css';
import { Link } from 'react-router-dom';
import backArrow from '../icons/backArrow.svg';
import dealerPhoto from '../icons/dealerPhoto.svg';
// import brownCross from '../icons/brownCross.svg';
import copyIcon from '../icons/copyIcon.svg';
import { useState } from 'react';

const AddDealer = () => {
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [doingBusinessAs, setDoingBusinessAs] = useState('');
  const [number, setNumber] = useState('');
  const [e_mail, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');
  const [file, setFile] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const BASE_URL = 'https://platejade-back.onrender.com';

  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

  const handleChange = event => {
    event.preventDefault();

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

      case 'e_mail':
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
    event.preventDefault();

    fetch(`${BASE_URL}/api/auth/admin/add-dealer`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company_name: companyName,
        company_address: address,
        logo: uploadedImage,
        contact_person: contactPerson,
        number: number,
        e_mail: e_mail,
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

    setShowNotification(true);
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

  const handleUpload = async event => {
    event.preventDefault();
    console.log('inside func');

    const originalFilename = file.name;

    // Send a request to the backend to get a pre-signed URL
    const uploadUrl = await fetch(`${BASE_URL}/api/auth/admin/s3Url/dealers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: originalFilename }),
    })
      .then(res => res.json())
      .then(res => {
        return res.uploadURL;
      });

    // console.log(uploadUrl);

    await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/png',
      },
      body: file,
    });

    const imageUrl = uploadUrl.split('?')[0];
    // console.log(imageUrl);
    setUploadedImage(imageUrl);
  };

  // console.log('uploaded image', uploadedImage);

  return (
    <>
      <section className={css.add_dealers_section}>
        <div className={css.add_dealers_admin_thumb}>
          <div className={css.back_btn_thumb}>
            <img alt="back" className={css.back_icon} src={backArrow} />

            <Link to="/dealers">
              <button className={css.back_to_dealers_btn}>
                Back to dealers
              </button>
            </Link>
          </div>
          <p className={css.add_dealer_text}>Add Dealer</p>
          <form onSubmit={handleSubmit} className={css.add_dealer_blocks_thumb}>
            <div>
              <div className={css.add_dealer_company_info}>
                <div
                  className={
                    !uploadedImage
                      ? css.add_dealer_upload_image_thumb
                      : css.uploaded_image_thumb
                  }
                >
                  {!uploadedImage ? (
                    <img
                      alt="dealer logo"
                      className={css.logo_icon}
                      src={dealerPhoto}
                    />
                  ) : (
                    <img
                      className={css.uploaded_image}
                      alt="uploaded plate"
                      height="150"
                      src={uploadedImage}
                    />
                  )}
                  <div className={css.add_dealer_upload_text}>
                    <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                      Click to select
                      <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <button className={css.upload_btn} onClick={handleUpload}>
                      <p>Click to upload</p>
                    </button>
                  </div>
                  <div className={css.border}></div>
                  {!uploadedImage && (
                    <p className={css.add_dealer_image_size}>
                      PNG or JPG recommended size (1000px*1000px)
                    </p>
                  )}
                </div>
                <div className={css.add_dealer_border}></div>
                <div className={css.add_dealer_company_thumb}>
                  <p className={css.add_dealer_company_text}>Company Info</p>
                  <ul className={css.add_dealer_company_list}>
                    <li className={css.company_item}>
                      <p className={css.company_label}> Company name</p>

                      <input
                        type="text"
                        name="companyName"
                        onChange={handleChange}
                        className={css.company_input}
                        placeholder="Company name"
                      />
                    </li>
                    <li className={css.company_item}>
                      <p className={css.company_label}> Doing Business As</p>

                      <input
                        type="text"
                        name="doingBusinessAs"
                        onChange={handleChange}
                        className={css.company_input}
                        placeholder="Doing Business As"
                      />
                    </li>
                  </ul>

                  <p className={css.company_label}> Company Address</p>

                  <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    className={css.company_input_address}
                    placeholder="Company Address"
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
                      : event => {
                          event.preventDefault();

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

            {showNotification && (
              <div className={css.notification_modal}>
                <p className={css.notification_message}>
                  You have successfully added the dealer
                </p>
                <Link to="/dealers">
                  <button className={css.notification_button}>OK</button>
                </Link>
              </div>
            )}

            <div className={css.dealer_contact_thumb}>
              <div className={css.add_dealer_contact_person}>
                <div className={css.add_dealer_company_thumb}>
                  <p className={css.add_dealer_company_text}>Сontact person</p>
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
                      <p className={css.company_label}> Phone number</p>

                      <input
                        type="text"
                        name="number"
                        onChange={handleChange}
                        className={css.company_input}
                        placeholder="1-394-803-3508 x776"
                      />
                    </li>
                  </ul>

                  <p className={css.company_label}> E-mail</p>

                  <input
                    type="text"
                    name="e_mail"
                    onChange={handleChange}
                    className={css.person_input_address}
                    placeholder="sportinginc@gmail.com"
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
                <button className={css.add_dealer_btn}>Add dealer</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
export default AddDealer;
