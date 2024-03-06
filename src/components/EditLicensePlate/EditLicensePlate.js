import css from './EditLicensePlate.module.css';
import { Link } from 'react-router-dom';
import backArrow from '../icons/backArrow.svg';
import dealerPhoto from '../icons/dealerPhoto.svg';
import bottomArrow from '../icons/bottomArrow.svg';
import openMenuIcon from '../icons/openMenuIcon.svg';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const EditLicensePlate = () => {
  const BASE_URL = 'https://platejade-back.onrender.com';

  const [searchParams] = useSearchParams();
  const [currentPlate, setCurrentPlate] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const [categories, setCategories] = useState([]);
  const [states, setStates] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [uploadedImage, setUploadedImage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const [file, setFile] = useState(null);

  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    // RECEIVE AND SET DEALERS
    fetch(`${BASE_URL}/api/auth/admin/alldealers`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const dealersArray = Array.from(
          new Set(result.dealers.map(item => item.company_name))
        );
        setDealers(dealersArray);

        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'dealer') {
              return { ...field, options: dealersArray };
            }
            return field;
          });
          return updatedFields;
        });
      });
    // RECEIVE AND SET CATEGORIES
    fetch(`${BASE_URL}/api/auth/plates/allcategories`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const categoriesArray = Array.from(
          new Set(result.categories.map(item => item.category))
        );
        setCategories(categoriesArray);
        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'category') {
              return { ...field, options: categoriesArray };
            }
            return field;
          });
          return updatedFields;
        });
      });

    // RECEIVE AND SET STATES
    fetch(`${BASE_URL}/api/auth/states`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const statesArray = Array.from(
          new Set(result.states.map(item => item.state))
        );
        setStates(statesArray);
        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'state') {
              return { ...field, options: statesArray };
            }
            return field;
          });
          return updatedFields;
        });
      });
  }, []);

  const categoriesArray = Array.from(
    new Set(categories.map(item => item.category))
  );

  const statesArray = Array.from(new Set(states.map(item => item.state)));

  const dealersArray = Array.from(new Set(dealers.map(item => item.dealers)));

  const initialFields = [
    {
      name: 'category',
      value: '',
      options: categoriesArray,
      showDropdown: false,
    },
    {
      name: 'state',
      value: '',
      options: statesArray,
      showDropdown: false,
    },
    {
      name: 'status',
      value: '',
      options: ['Active', 'Not available'],
      showDropdown: false,
    },
    {
      name: 'dealer',
      value: '',
      options: dealersArray,
      showDropdown: false,
    },
    { name: 'name', value: '' },
    // Input without menu example
  ];

  const [fields, setFields] = useState(initialFields);
  const [directInputs, setDirectInputs] = useState({
    name: '',
    description: '',
    shopName: '',
    link: '',
    price: '',
  });

  const handleInputChange = (name, value) => {
    setFields(
      fields.map(field =>
        field.name === name ? { ...field, value: value } : field
      )
    );
  };

  const handleOptionClick = (name, option) => {
    setFields(
      fields.map(field =>
        field.name === name
          ? { ...field, value: option, showDropdown: false }
          : field
      )
    );
  };

  const toggleDropdown = name => {
    setFields(
      fields.map(field =>
        field.name === name
          ? { ...field, showDropdown: !field.showDropdown }
          : field
      )
    );
  };

  const currentLicensePlate = searchParams.get('plate');

  useEffect(() => {
    setRefresh(false);
    fetch(`${BASE_URL}/api/auth/admin/plates/${currentLicensePlate}`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        setCurrentPlate(result.plate);
      });
  }, [refresh, currentLicensePlate]);

  const handleSubmit = event => {
    event.preventDefault();

    const unmatchedCategory = fields.find(
      field => field.name === 'category'
    )?.value;

    if (unmatchedCategory && !categories.includes(unmatchedCategory)) {
      fetch(`${BASE_URL}/api/auth/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: unmatchedCategory }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Response from backend route:', data);
        })
        .catch(error => {
          console.error('Error sending data to  backend route:', error);
        });
    }

    const unmatchedState = fields.find(field => field.name === 'state')?.value;

    if (unmatchedState && !states.includes(unmatchedState)) {
      fetch(`${BASE_URL}/api/auth/states`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: unmatchedState }),
      })
        .then(response => response.json(console.log(response.json)))
        .then(data => {
          console.log('Response from other backend route:', data);
        })
        .catch(error => {
          console.error('Error sending data to other backend route:', error);
        });
    }

    const formData = [
      ...fields.map(field => ({ [field.name]: field.value })),
      ...Object.entries(directInputs).map(([key, value]) => ({
        [key]: value,
      })),
    ].reduce((acc, obj) => ({ ...acc, ...obj }), {});

    formData['image'] = uploadedImage;

    const payload = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim() !== '') {
        payload[key] = value;
      }
    });
    console.log('payload', payload);

    // console.log('Form Data:', formData);
    const plateId = currentPlate[0]._id;

    fetch(`${BASE_URL}/api/auth/admin/plates/${plateId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json(console.log(response.json)))
      .then(data => {
        console.log('Response from backend route:', data);
      })
      .catch(error => {
        console.error('Error sending data to other backend route:', error);
      });

    // Reset values after submission
    setFields(
      initialFields.map(field => ({
        ...field,
        value: '',
        showDropdown: false,
      }))
    );
    setDirectInputs({
      //   name: '',
      category: '',
      state: '',
      dealer: '',
      status: '',
      //   productDescription: '',
      //   shopName: '',
      link: '',
      price: '',
      // Reset direct input values
    });
    setUploadedImage('');
    setShowNotification(true);
    setRefresh(true);
  };

  const handleUpload = async event => {
    event.preventDefault();
    console.log('inside func');

    const originalFilename = file.name;

    // Send a request to the backend to get a pre-signed URL
    const uploadUrl = await fetch(`${BASE_URL}/api/auth/admin/s3Url`, {
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

  console.log('uploaded image', uploadedImage);

  return (
    <>
      <section className={css.add_dealers_section}>
        {currentPlate.map(plate => {
          return (
            <div className={css.add_dealers_admin_thumb} key={plate.name}>
              <div className={css.back_btn_thumb}>
                <img alt="back" className={css.back_icon} src={backArrow} />

                <Link to="/">
                  <button className={css.back_to_dealers_btn}>
                    Back to plates
                  </button>
                </Link>
              </div>
              <p className={css.add_dealer_text}>Edit Plate</p>
              <form className={css.add_dealer_blocks_thumb}>
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
                        <label htmlFor="fileInput">
                          Click to upload
                          <input
                            type="file"
                            id="fileInput"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                          />
                        </label>
                        <button
                          className={css.upload_btn}
                          onClick={handleUpload}
                        >
                          <p>Upload Image</p>
                        </button>
                      </div>
                      <div className={css.border}></div>
                      {!uploadedImage && (
                        <p className={css.add_dealer_image_size}>
                          PNG or JPG recommended size (1000px*1000px)
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {showNotification && (
                  <div className={css.notification_modal}>
                    <p className={css.notification_message}>
                      You have successfully edited the plate
                    </p>
                    <Link to="/">
                      <button className={css.notification_button}>OK</button>
                    </Link>
                  </div>
                )}

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
                            type="text"
                            className={css.company_input}
                            value={directInputs.name}
                            onChange={e =>
                              setDirectInputs({
                                ...directInputs,
                                name: e.target.value,
                              })
                            }
                            placeholder={plate.name}
                          />
                        </li>
                        <li className={css.company_item}>
                          <div style={{ position: 'relative' }}>
                            <div className={css.filter_thumb_all}>
                              <p className={css.company_label}>
                                Choose a dealer{' '}
                              </p>
                              <input
                                className={css.company_input}
                                type="text"
                                value={
                                  fields.find(field => field.name === 'dealer')
                                    ?.value || ''
                                }
                                readOnly
                                placeholder={plate.dealer}
                              />
                              {fields.find(field => field.name === 'dealer')
                                ?.options &&
                              fields.find(field => field.name === 'dealer')
                                .showDropdown ? (
                                <img
                                  className={css.dropdown_arrow_open_menu}
                                  src={openMenuIcon}
                                  alt="Dropdown Arrow"
                                  onClick={() => toggleDropdown('dealer')}
                                />
                              ) : (
                                <img
                                  className={css.dropdown_arrow}
                                  src={bottomArrow}
                                  alt="Dropdown Arrow"
                                  onClick={() => toggleDropdown('dealer')}
                                />
                              )}
                            </div>
                            {fields.find(field => field.name === 'dealer')
                              ?.showDropdown &&
                              fields.find(field => field.name === 'dealer')
                                ?.options && ( // Render dropdown menu if options exist
                                <ul
                                  className={css.menu_items_list}
                                  id="style-2"
                                >
                                  {fields
                                    .find(field => field.name === 'dealer')
                                    ?.options.map((option, index) => (
                                      <li
                                        type="text"
                                        key={index}
                                        className={css.menu_item}
                                      >
                                        <label
                                          htmlFor={`dealer_option_${index}`}
                                        >
                                          <input
                                            className={css.input_checkbox}
                                            style={{ display: 'none' }}
                                            type="checkbox"
                                            id={`dealer_option_${index}`}
                                            checked={fields
                                              .find(
                                                field => field.name === 'dealer'
                                              )
                                              ?.value.includes(option)}
                                            onChange={() =>
                                              handleOptionClick(
                                                'dealer',
                                                option
                                              )
                                            }
                                          />
                                          {/* Render the SVG icon */}
                                          <span
                                            className={css.customCheckbox}
                                          ></span>{' '}
                                          {option}
                                        </label>
                                      </li>
                                    ))}
                                </ul>
                              )}
                          </div>
                        </li>

                        <li>
                          <p className={css.product_description_label}>
                            Product description
                          </p>
                          <input
                            type="text"
                            className={css.company_input}
                            value={directInputs.description}
                            onChange={e =>
                              setDirectInputs({
                                ...directInputs,
                                description: e.target.value,
                              })
                            }
                            placeholder={plate.description}
                          />
                        </li>
                      </ul>

                      <p className={css.add_dealer_company_text}>Add Filter</p>

                      <div className={css.menu_filters_thumb}>
                        <div
                          className={css.filter_thumb}
                          style={{ position: 'relative' }}
                        >
                          <div className={css.filter_thumb_all}>
                            <p className={css.company_label}>
                              {' '}
                              Choose category{' '}
                            </p>
                            <input
                              className={css.filter_item_input}
                              type="text"
                              value={
                                fields.find(field => field.name === 'category')
                                  ?.value || ''
                              }
                              onChange={event =>
                                handleInputChange(
                                  'category',
                                  event.target.value
                                )
                              }
                              placeholder={plate.category}
                            />
                            {fields.find(field => field.name === 'category')
                              ?.options &&
                            fields.find(field => field.name === 'category')
                              .showDropdown ? (
                              <img
                                className={css.dropdown_arrow_open_menu}
                                src={openMenuIcon}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('category')}
                              />
                            ) : (
                              <img
                                className={css.dropdown_arrow}
                                src={bottomArrow}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('category')}
                              />
                            )}
                          </div>
                          {fields.find(field => field.name === 'category')
                            ?.showDropdown &&
                            fields.find(field => field.name === 'category')
                              ?.options && ( // Render dropdown menu if options exist
                              <ul className={css.menu_items_list} id="style-2">
                                {fields
                                  .find(field => field.name === 'category')
                                  ?.options.map((option, index) => (
                                    <li className={css.menu_item} key={index}>
                                      <label
                                        htmlFor={`category_option_${index}`}
                                      >
                                        <input
                                          className={css.input_checkbox}
                                          style={{ display: 'none' }}
                                          type="checkbox"
                                          id={`category_option_${index}`}
                                          checked={fields
                                            .find(
                                              field => field.name === 'category'
                                            )
                                            ?.value.includes(option)}
                                          onChange={() =>
                                            handleOptionClick(
                                              'category',
                                              option
                                            )
                                          }
                                        />
                                        {/* Render the SVG icon */}
                                        <span
                                          className={css.customCheckbox}
                                        ></span>
                                        {option}
                                      </label>
                                    </li>
                                  ))}
                              </ul>
                            )}
                        </div>
                        <div style={{ position: 'relative' }}>
                          <div className={css.filter_thumb_all}>
                            <p className={css.company_label}> Choose state </p>
                            <input
                              className={css.filter_item_input}
                              type="text"
                              value={
                                fields.find(field => field.name === 'state')
                                  ?.value || ''
                              }
                              onChange={event =>
                                handleInputChange('state', event.target.value)
                              }
                              placeholder={plate.state}
                            />
                            {fields.find(field => field.name === 'state')
                              ?.options &&
                            fields.find(field => field.name === 'state')
                              .showDropdown ? (
                              <img
                                className={css.dropdown_arrow_open_menu}
                                src={openMenuIcon}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('state')}
                              />
                            ) : (
                              <img
                                className={css.dropdown_arrow}
                                src={bottomArrow}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('state')}
                              />
                            )}
                          </div>
                          {fields.find(field => field.name === 'state')
                            ?.showDropdown &&
                            fields.find(field => field.name === 'state')
                              ?.options && ( // Render dropdown menu if options exist
                              <ul className={css.menu_items_list} id="style-2">
                                {fields
                                  .find(field => field.name === 'state')
                                  ?.options.map((option, index) => (
                                    <li key={index} className={css.menu_item}>
                                      <label htmlFor={`state_option_${index}`}>
                                        <input
                                          className={css.input_checkbox}
                                          style={{ display: 'none' }}
                                          type="checkbox"
                                          id={`state_option_${index}`}
                                          checked={fields
                                            .find(
                                              field => field.name === 'state'
                                            )
                                            ?.value.includes(option)}
                                          onChange={() =>
                                            handleOptionClick('state', option)
                                          }
                                        />
                                        {/* Render the SVG icon */}
                                        <span
                                          className={css.customCheckbox}
                                        ></span>{' '}
                                        {option}
                                      </label>
                                    </li>
                                  ))}
                              </ul>
                            )}
                        </div>

                        <div style={{ position: 'relative' }}>
                          <div className={css.filter_thumb_all}>
                            <p className={css.company_label}> Choose status </p>
                            <input
                              className={css.filter_item_input}
                              type="text"
                              value={
                                fields.find(field => field.name === 'status')
                                  ?.value || ''
                              }
                              readOnly
                              placeholder={plate.status}
                            />
                            {fields.find(field => field.name === 'status')
                              ?.options && ( // Render dropdown arrow if options exist
                              <img
                                className={css.dropdown_arrow}
                                src={bottomArrow}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('status')}
                              />
                            )}
                          </div>
                          {fields.find(field => field.name === 'status')
                            ?.showDropdown &&
                            fields.find(field => field.name === 'status')
                              ?.options && ( // Render dropdown menu if options exist
                              <ul className={css.menu_items_list} id="style-2">
                                {fields
                                  .find(field => field.name === 'status')
                                  ?.options.map((option, index) => (
                                    <li key={index} className={css.menu_item}>
                                      <label htmlFor={`status_option_${index}`}>
                                        <input
                                          className={css.input_checkbox}
                                          style={{ display: 'none' }}
                                          type="checkbox"
                                          id={`status_option_${index}`}
                                          checked={fields
                                            .find(
                                              field => field.name === 'status'
                                            )
                                            ?.value.includes(option)}
                                          onChange={() =>
                                            handleOptionClick('status', option)
                                          }
                                        />
                                        <span
                                          className={css.customCheckbox}
                                        ></span>{' '}
                                        {option}
                                      </label>
                                    </li>
                                  ))}
                              </ul>
                            )}
                        </div>
                      </div>

                      <p className={css.add_dealer_company_text}>
                        Add link and price
                      </p>

                      <ul className={css.add_item_filter_list}>
                        <li className={css.filter_item}>
                          <p className={css.company_label}>Shop name</p>
                          <input
                            type="text"
                            className={css.company_input}
                            value={directInputs.shopName}
                            onChange={e =>
                              setDirectInputs({
                                ...directInputs,
                                shopName: e.target.value,
                              })
                            }
                            placeholder={plate.shopName}
                          />
                        </li>
                        <li className={css.filter_item}>
                          <p className={css.company_label}>
                            Attach a link to the product
                          </p>
                          <input
                            type="text"
                            className={css.company_input}
                            value={directInputs.link}
                            onChange={e =>
                              setDirectInputs({
                                ...directInputs,
                                link: e.target.value,
                              })
                            }
                            placeholder={plate.link}
                          />
                        </li>
                        <li className={css.filter_item}>
                          <p className={css.company_label}> Price ($) </p>
                          <input
                            type="text"
                            className={css.company_input}
                            value={directInputs.price}
                            onChange={e =>
                              setDirectInputs({
                                ...directInputs,
                                price: e.target.value,
                              })
                            }
                            placeholder={plate.price}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className={css.add_dealer_buttons_thumb}>
                    <Link to="/">
                      <button className={css.cancel_btn}>Cancel</button>
                    </Link>
                    <button
                      onClick={handleSubmit}
                      className={css.add_dealer_btn}
                    >
                      Edit plate
                    </button>
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
export default EditLicensePlate;
