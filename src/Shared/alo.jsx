import { useEffect, useState } from "react";
import Button from "../components/Button";
import InputText from "../components/InputText";
import { RadioCheckboxButton } from "../components/RadioCheckboxButton";
import { STATUS } from "../const";

const radioList = [
  {
    title: STATUS.NEW,
    value: STATUS.NEW,
  },
  {
    title: STATUS.DOING,
    value: STATUS.DOING,
  },
  {
    title: STATUS.DONE,
    value: STATUS.DONE,
  },
];
const DetailTaskForm = ({ formClass, currentTask, handleChangeTask }) => {
  const [form, setForm] = useState({
    title: "",
    creator: "",
    description: "",
    status: STATUS.NEW,
  });
  const [validData, setValiData] = useState({
    title: false,
    creator: false,
    description: false,
  });
  useEffect(() => {
    setDefaultValue();
  }, []);
  const setDefaultValue = (e) => {
    e && e.preventDefault();
    setForm(currentTask);
    setValiData({
      title: formField[0].regExpattern.test(currentTask.title),
      creator: formField[1].regExpattern.test(currentTask.creator),
      description: formField[2].regExpattern.test(currentTask.description),
    });
  };
  const { title, creator, description } = form;
  const formField = [
    {
      lable: "Title",
      placeholder: "Type title",
      name: "title",
      value: title,
      regExpattern: /^.{6,18}$/,
      messageError: "Please type title,it has length form 6 to 18",
    },
    {
      lable: "Creator",
      placeholder: "Type title",
      name: "creator",
      value: creator,
      regExpattern: /^.{6,12}$/,
      messageError: "Please type title,it has length form 6 to 12",
    },
    {
      lable: "Description",
      placeholder: "Type title",
      name: "description",
      value: description,
      regExpattern: /^.{0,150}$/,
      messageError: "Please type title,it has length form 0 to 150",
    },
  ];

  const handleChangeForm = (e, item = null) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    if (value && item) {
      setValiData({
        ...validData,
        [name]: item.regExpattern.test(value),
      });
    }
  };
  const renderForm = () => {
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
  const renderRadioButton = () => {
    return radioList.map((item) => (
    <RadioCheckboxButton
      key={`${item.value}`}
      title={item.title}
      type="radio"
      onClick={(e) => handleChangeForm(e)}
      name={"status"}
      value={item.value}
      isChecked={form.status === item.value}
    />)      
    );
  };
  
  const checkValidate = () =>
    validData.title && validData.creator && validData.description;

  return (
    <form
      onSubmit={(e) => handleChangeTask(e, form)}
      className={`formClassContainer`}//${formClass}
    >
      {renderForm()}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "40px",
        }}
      >

        {renderRadioButton()}
      </div>
      <div
        style={{
          display: "flex",
          width: "324",
          justifyContent: "space-between",
        }}
      >
        <Button title={"Save"} disabled={!checkValidate()} />
        <Button title={"Reset"} onClick={setDefaultValue} />
        <Button title={"Delete"} onClick={handleChangeTask} />
      </div>
    </form>
  );
};
export default DetailTaskForm;
