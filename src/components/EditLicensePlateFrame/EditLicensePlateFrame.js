import css from './EditLicensePlateFrame.module.css';
import { Link } from 'react-router-dom';
import backArrow from '../icons/backArrow.svg';
import dealerPhoto from '../icons/dealerPhoto.svg';
import bottomArrow from '../icons/bottomArrow.svg';
import openMenuIcon from '../icons/openMenuIcon.svg';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const EditLicensePlateFrame = () => {
  const BASE_URL = 'https://platejade-back.onrender.com';

  const [searchParams] = useSearchParams();
  const [currentFrame, setCurrentFrame] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const [materials, setMaterials] = useState([]);
  const [types, setTypes] = useState([]);
  const [finishTypes, setFinishTypes] = useState([]);
  const [themes, setThemes] = useState([]);
  const [attachmentTypes, setAttachmentTypes] = useState([]);
  const [features, setFeatures] = useState([]);
  const [colors, setColors] = useState([]);
  const [colorsName, setColorsName] = useState([]);
  const [states, setStates] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [uploadedImage, setUploadedImage] = useState('');
  const [uploadedBackground, setUploadedBackground] = useState('');

  const [inputValues, setInputValues] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  const [file, setFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [backgroundFileSelected, setBackgroundFileSelected] = useState(false);

  const handleFileChange = event => {
    setFile(event.target.files[0]);
    setFileSelected(true);
  };

  const handleBackgroundFileChange = event => {
    setBackgroundFile(event.target.files[0]);
    console.log(event.target.files[0])
    setBackgroundFileSelected(true);
  };

  useEffect(() => {
    // RECEIVE AND SET DEALERS
    fetch(`${BASE_URL}/api/auth/all-dealers`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const availableDealers = result.dealers.filter(
          item => item.company_name !== undefined
        );
        const dealersArray = Array.from(
          new Set(availableDealers.map(item => item.company_name))
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
    // RECEIVE AND SET MATERIALS
    fetch(`${BASE_URL}/api/auth/materials`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const materialsArray = Array.from(
          new Set(result.materials.map(item => item.material))
        );
        setMaterials(materialsArray);
        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'material') {
              return { ...field, options: materialsArray };
            }
            return field;
          });
          return updatedFields;
        });
      });

    // RECEIVE AND SET TYPES
    fetch(`${BASE_URL}/api/auth/types`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const typesArray = Array.from(
          new Set(result.types.map(item => item.type))
        );
        setTypes(typesArray);
        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'type') {
              return { ...field, options: typesArray };
            }
            return field;
          });
          return updatedFields;
        });
      });

    // RECEIVE AND SET FINISH TYPES
    fetch(`${BASE_URL}/api/auth/finish-types`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const finishTypesArray = Array.from(
          new Set(result.finishTypes.map(item => item.finishType))
        );
        setFinishTypes(finishTypesArray);
        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'finishType') {
              return { ...field, options: finishTypesArray };
            }
            return field;
          });
          return updatedFields;
        });
      });

    // RECEIVE AND SET ATTACHMENT THEMES
    fetch(`${BASE_URL}/api/auth/themes`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const themesArray = Array.from(
          new Set(result.themes.map(item => item.theme))
        );
        setThemes(themesArray);
        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'theme') {
              return { ...field, options: themesArray };
            }
            return field;
          });
          return updatedFields;
        });
      });

    // RECEIVE AND SET ATTACHMENT TYPES
    fetch(`${BASE_URL}/api/auth/attachment-types`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const attachmentTypesArray = Array.from(
          new Set(result.attachmentTypes.map(item => item.attachmentType))
        );
        setAttachmentTypes(attachmentTypesArray);
        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'attachmentType') {
              return { ...field, options: attachmentTypesArray };
            }
            return field;
          });
          return updatedFields;
        });
      });

    // RECEIVE AND SET ADDITIONAL FEATURES
    fetch(`${BASE_URL}/api/auth/features`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const featuresArray = Array.from(
          new Set(result.features.map(item => item.feature))
        );

        setFeatures(featuresArray);
        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'feature') {
              return { ...field, options: featuresArray };
            }
            return field;
          });
          return updatedFields;
        });
      });

    // RECEIVE AND SET NAMES AND  COLORS
    fetch(`${BASE_URL}/api/auth/colors`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        const colorNamesArray = Array.from(
          new Set(result.colors.map(item => item.colorName))
        );
        const colorArray = Array.from(
          new Set(result.colors.map(item => item.color))
        );
        setColors(colorArray.flat());
        setColorsName(colorNamesArray);

        setFields(prevFields => {
          const updatedFields = prevFields.map(field => {
            if (field.name === 'colorName') {
              return { ...field, options: colorNamesArray };
            }
            if (field.name === 'color') {
              return { ...field, options: colorArray };
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

  const materialsArray = Array.from(
    new Set(materials.map(item => item.material))
  );

  const typesArray = Array.from(new Set(types.map(item => item.type)));

  const finishTypesArray = Array.from(
    new Set(finishTypes.map(item => item.finishType))
  );

  const attachmentTypesArray = Array.from(
    new Set(attachmentTypes.map(item => item.attachmentType))
  );

  const featuresArray = Array.from(new Set(features.map(item => item.feature)));

  const colorNamesArray = Array.from(
    new Set(colorsName.map(item => item.colorName))
  );

  const colorArray = Array.from(new Set(colors.map(item => item.color)));

  const themesArray = Array.from(new Set(themes.map(item => item.theme)));

  const statesArray = Array.from(new Set(states.map(item => item.state)));

  const dealersArray = Array.from(new Set(dealers.map(item => item.dealers)));

  const initialFields = [
    {
      name: 'material',
      value: '',
      options: materialsArray,
      showDropdown: false,
    },
    {
      name: 'theme',
      value: '',
      options: themesArray,
      showDropdown: false,
    },
    {
      name: 'type',
      value: '',
      options: typesArray,
      showDropdown: false,
    },
    {
      name: 'attachmentType',
      value: '',
      options: attachmentTypesArray,
      showDropdown: false,
    },
    {
      name: 'finishType',
      value: '',
      options: finishTypesArray,
      showDropdown: false,
    },
    {
      name: 'state',
      value: '',
      options: statesArray,
      showDropdown: false,
    },
    {
      name: 'feature',
      value: '',
      options: featuresArray,
      showDropdown: false,
    },
    {
      name: 'colorName',
      value: '',
      options: colorNamesArray,
      showDropdown: false,
    },
    {
      name: 'color',
      value: '',
      options: colorArray,
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
    firstShopName: '',
    amazonLink: '',
    amazonPrice: '',
    secondShopName: '',
    secondShopLink: '',
    secondShopPrice: '',
  });

  // Handler function to toggle selection of a checkbox or set input values
  const handleInputChange = (name, value) => {
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleOptionClick = (name, option) => {
    const selectedField = fields.find(field => field.name === name);
    const currentValue = selectedField.value || [];

    let updatedValue;
    if (currentValue.includes(option)) {
      updatedValue = currentValue.filter(item => item !== option);
    } else {
      updatedValue = [...currentValue, option];
    }

    const updatedFields = fields.map(field =>
      field.name === name ? { ...field, value: updatedValue } : field
    );

    setFields(updatedFields);
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

  const currentPlateFrame = searchParams.get('frame');

  useEffect(() => {
    setRefresh(false);
    fetch(`${BASE_URL}/api/auth/admin/frames/${currentPlateFrame}`, {
      method: 'GET',
      header: {},
    })
      .then(res => res.json())
      .then(result => {
        setCurrentFrame(result.frame);
        setDirectInputs({
          name: result.frame[0].name || '',
          description: result.frame[0].description || '',
          firstShopName: result.frame[0].firstShopName || '',
          amazonLink: result.frame[0].amazonLink || '',
          amazonPrice: result.frame[0].amazonPrice || '',
          secondShopName: result.frame[0].secondShopName || '',
          secondShopLink: result.frame[0].secondShopLink || '',
          secondShopPrice: result.frame[0].secondShopPrice || '',
        });
      });
  }, [refresh, currentPlateFrame]);

  const handleSubmit = event => {
    event.preventDefault();

    // const unmatchedCategory = fields.find(
    //   field => field.name === 'category'
    // )?.value;

    // const unmatchedState = fields.find(field => field.name === 'state')?.value;

    // if (unmatchedState && !states.includes(unmatchedState)) {
    //   fetch(`${BASE_URL}/api/auth/states`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ state: unmatchedState }),
    //   })
    //     .then(response => response.json(console.log(response.json)))
    //     .then(data => {
    //       console.log('Response from other backend route:', data);
    //     })
    //     .catch(error => {
    //       console.error('Error sending data to other backend route:', error);
    //     });
    // }
    // Initialize formData as an empty object
    const formData = {};

    // Iterate over fields and add their values to formData
    fields.forEach(field => {
      formData[field.name] = field.value;
    });

    // Add directInputs to formData
    Object.entries(directInputs).forEach(([key, value]) => {
      formData[key] = value;
    });

    // Add uploaded image to formData
    formData['image'] = uploadedImage;
    formData['backgroundImages'] = uploadedBackground;

    // Additional logic for specific form data based on conditions
    if (formData.colorName === 'Multicolor') {
      formData['color'] = ['66465', '9198E5'];
    } else if (formData.colorName === 'Transparent') {
      formData['color'] = [''];
    }

    const dealersArray = fields.find(field => field.name === 'dealer')?.value;
    const dealersString = dealersArray ? dealersArray.join(', ') : '';

    formData['dealer'] = dealersString;

    console.log('Form Data:', JSON.stringify(formData));

    // console.log('Form Data:', formData);
    const frameId = currentFrame[0]._id;

    const payload = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string' && value.trim() !== '') {
          payload[key] = value;
      } else if (Array.isArray(value) && value.length > 0) {
          payload[key] = value;
      } else if (typeof value === 'object' && value !== null && Object.keys(value).length > 0) {
          payload[key] = value;
      } else if (typeof value !== 'string' && value !== '') {
          payload[key] = value;
      }
  });

    // console.log('Form Data:', formData);

    fetch(`${BASE_URL}/api/auth/admin/frames/${frameId}`, {
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
    // setRefresh(true);
  };

  const handleUpload = async event => {
    event.preventDefault();
    console.log('inside func');

    const originalFilename = file.name;

    // Send a request to the backend to get a pre-signed URL
    const uploadUrl = await fetch(`${BASE_URL}/api/auth/admin/s3Url/frames`, {
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
    console.log(imageUrl);
    setUploadedImage(imageUrl);
    setFileSelected(false);
  };

  const handleUploadBackground = async event => {
    event.preventDefault();
    // console.log('inside func');
    // console.log(file);

    const originalFilename = backgroundFile.name;

    // Send a request to the backend to get a pre-signed URL
    const uploadUrl = await fetch(
      `${BASE_URL}/api/auth/admin/s3Url/backgrounds`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: originalFilename }),
      }
    )
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
      body: backgroundFile,
    });

    const imageUrl = uploadUrl.split('?')[0];
    console.log(imageUrl);
    setUploadedBackground(imageUrl);
    setBackgroundFileSelected(false);
  };

  return (
    <>
      <section className={css.add_dealers_section}>
        {currentFrame.map(frame => {
          return (
            <div className={css.add_dealers_admin_thumb} key={frame._id}>
              <div className={css.back_btn_thumb}>
                <img alt="back" className={css.back_icon} src={backArrow} />

                <Link to="/plate-frame">
                  <button className={css.back_to_dealers_btn}>
                    Back to frames
                  </button>
                </Link>
              </div>
              <p className={css.add_dealer_text}>Edit Frame</p>
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
                          className={css.uploaded_image}
                          src={frame.image}
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
                        <label htmlFor="fileInput"style={{ cursor: 'pointer' }}>
                        {!fileSelected ? "Click to select image" : ""}
                          <input
                            type="file"
                            id="fileInput"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                          />
                        </label>
                        {fileSelected && (
                        <button className={css.upload_btn} onClick={handleUpload}>
                          <p>Click to upload</p>
                        </button>
                        )}
                      </div>
                      <div className={css.border}></div>
                      {!uploadedImage && (
                        <p className={css.add_dealer_image_size}>
                          PNG or JPG recommended size (1000px*1000px)
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={css.add_dealer_company_info}>
                    <div
                      className={
                        !uploadedBackground
                          ? css.add_dealer_upload_image_thumb
                          : css.uploaded_image_thumb
                      }
                    >
                      {!uploadedBackground ? (
                        <img
                          alt="dealer logo"
                          className={frame.backgroundImages[0] !== "" ? css.uploaded_image : css.logo_icon}
                          src={frame.backgroundImages[0] !== "" ? frame.backgroundImages : dealerPhoto}
                        />
                      ) : (
                        <img
                          className={css.uploaded_image}
                          alt="uploaded plate"
                          height="150"
                          src={uploadedBackground}
                        />
                      )}
                      <div className={css.add_dealer_upload_text}>
                      <label htmlFor="backgroundFileInput" style={{ cursor: 'pointer' }}>
                      {!backgroundFileSelected ? "Click to select background" : ""}
                          <input
                            type="file"
                            id="backgroundFileInput"
                            onChange={handleBackgroundFileChange}
                            style={{ display: 'none' }}
                          />
                        </label>
                        {backgroundFileSelected && (
                    <button
                      className={css.upload_btn}
                      onClick={handleUploadBackground}
                    >
                      <p>Click to upload background</p>
                    </button>
                    )}
                      </div>
                      <div className={css.border}></div>
                      {!uploadedBackground && (
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
                      You have successfully edited the frame
                    </p>
                    <Link to="/plate-frame">
                      <button className={css.notification_button}>OK</button>
                    </Link>
                  </div>
                )}

                <div className={css.dealer_contact_thumb}>
                  <div className={css.add_dealer_contact_person}>
                    <div className={css.add_dealer_company_thumb}>
                      <p className={css.add_dealer_company_text}>
                        Plate Frame Information
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
                            // placeholder="Name"
                          />
                        </li>
                        <li className={css.company_item}>
                          <div style={{ position: 'relative' }}>
                            <div className={css.filter_thumb_all}>
                              <p className={css.company_label}>
                                Choose a dealer
                              </p>
                              <input
                                className={css.company_input}
                                type="text"
                                value={
                                  fields.find(field => field.name === 'dealer')
                                    ?.value || ''
                                }
                                readOnly
                                placeholder={frame.dealer}
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
                                  className={css.menu_items_list_dealers}
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

                        <li className={css.company_input_description}>
                          <p className={css.product_description_label}>
                            Product description
                          </p>
                          <textarea 
                            type="text"
                            className={css.company_input}
                            value={directInputs.description}
                            onChange={e => {
                                setDirectInputs({
                                  ...directInputs,
                                  description: e.target.value,
                                });
                                e.target.style.height = `${e.target.scrollHeight}px`;
                              }
                            }
                            // placeholder="Product description"
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
                            <p className={css.company_label}>Material</p>
                            <input
                              className={css.filter_item_input}
                              type="text"
                              value={
                                fields.find(field => field.name === 'material')
                                  ?.value || ''
                              }
                              onChange={event =>
                                handleInputChange(
                                  'material',
                                  event.target.value
                                )
                              }
                              placeholder={frame.material}
                            />
                            {fields.find(field => field.name === 'material')
                              ?.options &&
                            fields.find(field => field.name === 'material')
                              .showDropdown ? (
                              <img
                                className={css.dropdown_arrow_open_menu}
                                src={openMenuIcon}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('material')}
                              />
                            ) : (
                              <img
                                className={css.dropdown_arrow}
                                src={bottomArrow}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('material')}
                              />
                            )}
                          </div>
                          {fields.find(field => field.name === 'material')
                            ?.showDropdown &&
                            fields.find(field => field.name === 'material')
                              ?.options && ( // Render dropdown menu if options exist
                              <ul className={css.menu_items_list} id="style-2">
                                {fields
                                  .find(field => field.name === 'material')
                                  ?.options.map((option, index) => (
                                    <li className={css.menu_item} key={index}>
                                      <label
                                        htmlFor={`material_option_${index}`}
                                      >
                                        <input
                                          className={css.input_checkbox}
                                          style={{ display: 'none' }}
                                          type="checkbox"
                                          id={`material_option_${index}`}
                                          checked={fields
                                            .find(
                                              field => field.name === 'material'
                                            )
                                            ?.value.includes(option)}
                                          onChange={() =>
                                            handleOptionClick(
                                              'material',
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
                            <p className={css.company_label}> Choose type</p>
                            <input
                              className={css.filter_item_input}
                              type="text"
                              value={
                                fields.find(field => field.name === 'type')
                                  ?.value || ''
                              }
                              onChange={event =>
                                handleInputChange('type', event.target.value)
                              }
                              placeholder={frame.type}
                            />
                            {fields.find(field => field.name === 'type')
                              ?.options &&
                            fields.find(field => field.name === 'type')
                              .showDropdown ? (
                              <img
                                className={css.dropdown_arrow_open_menu}
                                src={openMenuIcon}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('type')}
                              />
                            ) : (
                              <img
                                className={css.dropdown_arrow}
                                src={bottomArrow}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('type')}
                              />
                            )}
                          </div>
                          {fields.find(field => field.name === 'type')
                            ?.showDropdown &&
                            fields.find(field => field.name === 'type')
                              ?.options && ( // Render dropdown menu if options exist
                              <ul className={css.menu_items_list} id="style-2">
                                {fields
                                  .find(field => field.name === 'type')
                                  ?.options.map((option, index) => (
                                    <li key={index} className={css.menu_item}>
                                      <label htmlFor={`type_option_${index}`}>
                                        <input
                                          className={css.input_checkbox}
                                          style={{ display: 'none' }}
                                          type="checkbox"
                                          id={`type_option_${index}`}
                                          checked={fields
                                            .find(
                                              field => field.name === 'type'
                                            )
                                            ?.value.includes(option)}
                                          onChange={() =>
                                            handleOptionClick('type', option)
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
                            <p className={css.company_label}>
                              {' '}
                              Choose finish type
                            </p>
                            <input
                              className={css.filter_item_input}
                              type="text"
                              value={
                                fields.find(
                                  field => field.name === 'finishType'
                                )?.value || ''
                              }
                              onChange={event =>
                                handleInputChange(
                                  'finishType',
                                  event.target.value
                                )
                              }
                              placeholder={frame.finishType}
                            />
                            {fields.find(field => field.name === 'finishType')
                              ?.options &&
                            fields.find(field => field.name === 'finishType')
                              .showDropdown ? (
                              <img
                                className={css.dropdown_arrow_open_menu}
                                src={openMenuIcon}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('finishType')}
                              />
                            ) : (
                              <img
                                className={css.dropdown_arrow}
                                src={bottomArrow}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('finishType')}
                              />
                            )}
                          </div>
                          {fields.find(field => field.name === 'finishType')
                            ?.showDropdown &&
                            fields.find(field => field.name === 'finishType')
                              ?.options && ( // Render dropdown menu if options exist
                              <ul className={css.menu_items_list} id="style-2">
                                {fields
                                  .find(field => field.name === 'finishType')
                                  ?.options.map((option, index) => (
                                    <li key={index} className={css.menu_item}>
                                      <label
                                        htmlFor={`finishType_option_${index}`}
                                      >
                                        <input
                                          className={css.input_checkbox}
                                          style={{ display: 'none' }}
                                          type="checkbox"
                                          id={`finishType_option_${index}`}
                                          checked={fields
                                            .find(
                                              field =>
                                                field.name === 'finishType'
                                            )
                                            ?.value.includes(option)}
                                          onChange={() =>
                                            handleOptionClick(
                                              'finishType',
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

                        <div style={{ position: 'relative' }}>
                          <div className={css.filter_thumb_all}>
                            <p className={css.company_label}> Choose theme</p>
                            <input
                              className={css.filter_item_input}
                              type="text"
                              value={
                                fields.find(field => field.name === 'theme')
                                  ?.value || ''
                              }
                              onChange={event =>
                                handleInputChange('theme', event.target.value)
                              }
                              placeholder={frame.theme}
                            />
                            {fields.find(field => field.name === 'theme')
                              ?.options &&
                            fields.find(field => field.name === 'theme')
                              .showDropdown ? (
                              <img
                                className={css.dropdown_arrow_open_menu}
                                src={openMenuIcon}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('theme')}
                              />
                            ) : (
                              <img
                                className={css.dropdown_arrow}
                                src={bottomArrow}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('theme')}
                              />
                            )}
                          </div>
                          {fields.find(field => field.name === 'theme')
                            ?.showDropdown &&
                            fields.find(field => field.name === 'theme')
                              ?.options && ( // Render dropdown menu if options exist
                              <ul className={css.menu_items_list} id="style-2">
                                {fields
                                  .find(field => field.name === 'theme')
                                  ?.options.map((option, index) => (
                                    <li key={index} className={css.menu_item}>
                                      <label htmlFor={`theme_option_${index}`}>
                                        <input
                                          className={css.input_checkbox}
                                          style={{ display: 'none' }}
                                          type="checkbox"
                                          id={`theme_option_${index}`}
                                          checked={fields
                                            .find(
                                              field => field.name === 'theme'
                                            )
                                            ?.value.includes(option)}
                                          onChange={() =>
                                            handleOptionClick('theme', option)
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
                            <p className={css.company_label}>
                              {' '}
                              Choose attachment type
                            </p>
                            <input
                              className={css.filter_item_input}
                              type="text"
                              value={
                                fields.find(
                                  field => field.name === 'attachmentType'
                                )?.value || ''
                              }
                              onChange={event =>
                                handleInputChange(
                                  'attachmentType',
                                  event.target.value
                                )
                              }
                              placeholder={frame.attachmentType}
                            />
                            {fields.find(
                              field => field.name === 'attachmentType'
                            )?.options &&
                            fields.find(
                              field => field.name === 'attachmentType'
                            ).showDropdown ? (
                              <img
                                className={css.dropdown_arrow_open_menu}
                                src={openMenuIcon}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('attachmentType')}
                              />
                            ) : (
                              <img
                                className={css.dropdown_arrow}
                                src={bottomArrow}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('attachmentType')}
                              />
                            )}
                          </div>
                          {fields.find(field => field.name === 'attachmentType')
                            ?.showDropdown &&
                            fields.find(
                              field => field.name === 'attachmentType'
                            )?.options && ( // Render dropdown menu if options exist
                              <ul className={css.menu_items_list} id="style-2">
                                {fields
                                  .find(
                                    field => field.name === 'attachmentType'
                                  )
                                  ?.options.map((option, index) => (
                                    <li key={index} className={css.menu_item}>
                                      <label
                                        htmlFor={`attachmentType_option_${index}`}
                                      >
                                        <input
                                          className={css.input_checkbox}
                                          style={{ display: 'none' }}
                                          type="checkbox"
                                          id={`attachmentType_option_${index}`}
                                          checked={fields
                                            .find(
                                              field =>
                                                field.name === 'attachmentType'
                                            )
                                            ?.value.includes(option)}
                                          onChange={() =>
                                            handleOptionClick(
                                              'attachmentType',
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

                        <div style={{ position: 'relative' }}>
                          <div className={css.filter_thumb_all}>
                            <p className={css.company_label}>
                              {' '}
                              Choose additional features
                            </p>
                            <input
                              className={css.filter_item_input}
                              type="text"
                              value={
                                fields.find(field => field.name === 'feature')
                                  ?.value || ''
                              }
                              onChange={event =>
                                handleInputChange('feature', event.target.value)
                              }
                              placeholder={frame.feature}
                            />
                            {fields.find(field => field.name === 'feature')
                              ?.options &&
                            fields.find(field => field.name === 'feature')
                              .showDropdown ? (
                              <img
                                className={css.dropdown_arrow_open_menu}
                                src={openMenuIcon}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('feature')}
                              />
                            ) : (
                              <img
                                className={css.dropdown_arrow}
                                src={bottomArrow}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('feature')}
                              />
                            )}
                          </div>
                          {fields.find(field => field.name === 'feature')
                            ?.showDropdown &&
                            fields.find(field => field.name === 'feature')
                              ?.options && ( // Render dropdown menu if options exist
                              <ul className={css.menu_items_list} id="style-2">
                                {fields
                                  .find(field => field.name === 'feature')
                                  ?.options.map((option, index) => (
                                    <li key={index} className={css.menu_item}>
                                      <label
                                        htmlFor={`feature_option_${index}`}
                                      >
                                        <input
                                          className={css.input_checkbox}
                                          style={{ display: 'none' }}
                                          type="checkbox"
                                          id={`feature_option_${index}`}
                                          checked={fields
                                            .find(
                                              field => field.name === 'feature'
                                            )
                                            ?.value.includes(option)}
                                          onChange={() =>
                                            handleOptionClick('feature', option)
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
                            <p className={css.company_label}>
                              Choose color name
                            </p>
                            <input
                              className={css.filter_item_input}
                              type="text"
                              value={
                                fields.find(field => field.name === 'colorName')
                                  ?.value || ''
                              }
                              onChange={event =>
                                handleInputChange(
                                  'colorName',
                                  event.target.value
                                )
                              }
                              placeholder={frame.colorName}
                            />
                            {fields.find(field => field.name === 'colorName')
                              ?.options &&
                            fields.find(field => field.name === 'colorName')
                              .showDropdown ? (
                              <img
                                className={css.dropdown_arrow_open_menu}
                                src={openMenuIcon}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('colorName')}
                              />
                            ) : (
                              <img
                                className={css.dropdown_arrow}
                                src={bottomArrow}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('colorName')}
                              />
                            )}
                          </div>
                          {fields.find(field => field.name === 'colorName')
                            ?.showDropdown &&
                            fields.find(field => field.name === 'colorName')
                              ?.options && ( // Render dropdown menu if options exist
                              <ul className={css.menu_items_list} id="style-2">
                                {fields
                                  .find(field => field.name === 'colorName')
                                  ?.options.map((option, index) => (
                                    <li key={index} className={css.menu_item}>
                                      <label
                                        htmlFor={`colorName_option_${index}`}
                                      >
                                        <input
                                          className={css.input_checkbox}
                                          style={{ display: 'none' }}
                                          type="checkbox"
                                          id={`colorName_option_${index}`}
                                          checked={fields
                                            .find(
                                              field =>
                                                field.name === 'colorName'
                                            )
                                            ?.value.includes(option)}
                                          onChange={() =>
                                            handleOptionClick(
                                              'colorName',
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

                        <div style={{ position: 'relative' }}>
                          <div className={css.filter_thumb_all}>
                            <p className={css.company_label}>Choose color</p>
                            <input
                              className={css.filter_item_input}
                              type="text"
                              value={
                                fields.find(field => field.name === 'color')
                                  ?.value || ''
                              }
                              onChange={event =>
                                handleInputChange('color', event.target.value)
                              }
                              placeholder={frame.color}
                            />
                            {fields.find(field => field.name === 'color')
                              ?.options &&
                            fields.find(field => field.name === 'color')
                              .showDropdown ? (
                              <img
                                className={css.dropdown_arrow_open_menu}
                                src={openMenuIcon}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('color')}
                              />
                            ) : (
                              <img
                                className={css.dropdown_arrow}
                                src={bottomArrow}
                                alt="Dropdown Arrow"
                                onClick={() => toggleDropdown('color')}
                              />
                            )}
                          </div>
                          {fields.find(field => field.name === 'color')
                            ?.showDropdown &&
                            fields.find(field => field.name === 'color')
                              ?.options && ( // Render dropdown menu if options exist
                              <ul className={css.menu_items_list} id="style-2">
                                {fields
                                  .find(field => field.name === 'color')
                                  ?.options.map((option, index) => (
                                    <li key={index} className={css.menu_item}>
                                      <label htmlFor={`color_option_${index}`}>
                                        <input
                                          className={css.input_checkbox}
                                          style={{ display: 'none' }}
                                          type="checkbox"
                                          id={`color_option_${index}`}
                                          checked={fields
                                            .find(
                                              field => field.name === 'color'
                                            )
                                            ?.value.includes(option)}
                                          onChange={() =>
                                            handleOptionClick('color', option)
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
                              placeholder={frame.state}
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
                              placeholder={frame.status}
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
                            value={directInputs.firstShopName}
                            onChange={e =>
                              setDirectInputs({
                                ...directInputs,
                                firstShopName: e.target.value,
                              })
                            }
                            // placeholder="Amazon"
                          />
                        </li>
                        <li className={css.filter_item}>
                          <p className={css.company_label}>
                            Attach a link to the product
                          </p>
                          <input
                            type="text"
                            className={css.company_input}
                            value={directInputs.amazonLink}
                            onChange={e =>
                              setDirectInputs({
                                ...directInputs,
                                amazonLink: e.target.value,
                              })
                            }
                            // placeholder="Link"
                          />
                        </li>
                        <li className={css.filter_item}>
                          <p className={css.company_label}> Price ($) </p>
                          <input
                            type="text"
                            className={css.company_input}
                            value={directInputs.amazonPrice}
                            onChange={e =>
                              setDirectInputs({
                                ...directInputs,
                                amazonPrice: e.target.value,
                              })
                            }
                            // placeholder="Price"
                          />
                        </li>
                      </ul>
                      <ul className={css.add_item_filter_list}>
                        <li className={css.filter_item}>
                          <p className={css.company_label}>Second shop name</p>
                          <input
                            type="text"
                            className={css.company_input}
                            value={directInputs.secondShopName}
                            onChange={e =>
                              setDirectInputs({
                                ...directInputs,
                                secondShopName: e.target.value,
                              })
                            }
                            // placeholder="Shop name"
                          />
                        </li>
                        <li className={css.filter_item}>
                          <p className={css.company_label}>
                            Attach a link to the product
                          </p>
                          <input
                            type="text"
                            className={css.company_input}
                            value={directInputs.secondShopLink}
                            onChange={e =>
                              setDirectInputs({
                                ...directInputs,
                                secondShopLink: e.target.value,
                              })
                            }
                            // placeholder="Link"
                          />
                        </li>
                        <li className={css.filter_item}>
                          <p className={css.company_label}> Price ($) </p>
                          <input
                            type="text"
                            className={css.company_input}
                            value={directInputs.secondShopPrice}
                            onChange={e =>
                              setDirectInputs({
                                ...directInputs,
                                secondShopPrice: e.target.value,
                              })
                            }
                            // placeholder="Price"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className={css.add_dealer_buttons_thumb}>
                    <Link to="/plate-frame">
                      <button className={css.cancel_btn}>Cancel</button>
                    </Link>
                    <button
                      onClick={handleSubmit}
                      className={css.add_dealer_btn}
                    >
                      Edit frame
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
export default EditLicensePlateFrame;
