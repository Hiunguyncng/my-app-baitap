import InputText from "../components/InputText";
import Button from "../components/Button";
import { useState } from "react";

const AddNewForm = ({ formClass, handleSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    creator: "",
    description: "",
  });
  const [validData, setValidData] = useState({
    title: false,
    creator: false,
    description: false,
  });
  const { title, creator, description } = form;

  const formField = [
    {
      lable: "Title",
      placeholder: "Type title",
      name: "title",
      value: title,
      regExPattern: /^.{6,18}$/,
      messageError: " Please type title ,it has length form 6 to 18",
    },
    {
      lable: "Creator",
      placeholder: "Type Name of  Creator",
      name: "creator",
      value: creator,
      regExPattern: /^.{6,12}$/,
      messageError: " Please type title ,it has length form 6 to 12",
    },
    {
      lable: "Description",
      placeholder: "Description Details",
      name: "description",
      value: description,
      regExPattern: /^.{0,150}$/,
      messageError: " Please type title ,it has length form 6 to 150",
    },
  ];
  const handleChangeForm = (e, item) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    if (value) {
      setValidData({
        ...validData,
        [name]: item.regExPattern.test(value),
      });
    }
  };
  const rederForm = () => {
    return formField.map((item, index) => {
      return (
        <InputText
          {...item}
          key={`${item.name}_${index}`}
          onChange={(e) => handleChangeForm(e, item)}
          error={!item.value || validData[item.name] ? "" : item.messageError}
          />
      );
    });
  };
  const checkValidate = ()=>validData.title && validData.creator && validData.description;
  return (
    <form onSubmit={handleSubmit} className={`formClassContainer ${formClass}`}>
      {rederForm()}
      <div>
        <Button title={"Save"} type={"submit"} disabled={!checkValidate()}/>
      </div>
    </form>
  );
};

export default AddNewForm;
