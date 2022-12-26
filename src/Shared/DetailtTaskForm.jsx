import { useEffect, useState } from "react";
import Button from "../components/Button";
import InputText from "../components/InputText";
import RadioCheckboxButton from "../components/RadioCheckboxButton";
import { STATUS } from "../const";

const radioList = [{
    title:STATUS.NEW,
    value:STATUS.NEW,

},
{
    title:STATUS.DOING,
    value:STATUS.DOING,
},
{
    title:STATUS.DONE,
    value:STATUS.DONE,
},
]

const DetailTaskForm=({formClass,currentTask,handlechangeTask})=>{
    const [form,setForm]=useState({
        title:'',
        creator:'',
        description:'',
        status:STATUS.NEW,
    });
    const [validData,setvalidData]=useState({
        title:false,
        creator:false,
        description:true,
        
    });
    useEffect(()=>{
        setDefaultValue()
    },[])
    const setDefaultValue = (e) => {
        e && e.prevenDefault();
        setForm(currentTask);
        setvalidData({
            title : formField[0].regExPattern.test(currentTask.title),
            creator: formField[1].regExPattern.test(currentTask.creator),
            description: formField[2].regExPattern.test(currentTask.description),

        });
    };
    const{title,creator,description} = form;
    const formField = [
        {
            label: 'Title',
            placeholder: 'Type title',
            name : 'title' ,
            value: title,
            regExPattern : /^.{6,18}$/,
            MessageError : 'please type title, it has lenght from 6 to 18',
        },
        {
            label: 'Creator',
            placeholder: 'Type name of Creator',
            name : 'creator' ,
            value: creator,
            regExPattern : /^.{6,12}$/,
            MessageError : 'please Type name of Creator, it has lenght from 6 to 12',
        },
        {
            label: 'Description',
            placeholder: 'Type description details',
            name : 'description' ,
            value: description,
            regExPattern : /^.{0,120}$/,
            MessageError : 'please Type description details, it has lenght from 0 to 120',
        },
    ];
    const handlechangeForm = (e,item = null) => {
        const{ value,name} = e.target;
        setForm({
            ...form,
            [name]:value,
        });
        if (value && item){
            setvalidData({
                ...validData,
                [name] : item.regExPattern.test(value),
            });
        }
    };
    const renderForm= () => {
        return formField.map((item,index)=>{
            return(
                <InputText
                {...item}
                key={`${item.name}_${index}`}
                onChange={(e)=>handlechangeForm(e,item)}
                error={!item.value||validData[item.name]?'': item.MessageError}
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
            onClick={(e)=> handlechangeForm(e)}
            name= {'status'}
            value={item.value}
            isChecked={form.status === item.value}
            />
        ));
    };
    const checkValidate = () => validData.title && validData.creator && validData.description
    return(
        <form onSubmit={(e)=> handlechangeTask(e,form)}
         className={`formClassContainer${formClass}`}>
            {renderForm()}
            <div style={{
                display: "flex",
                width: '100%',
                justifyContent: 'space-between',
                marginTop: '40px',
            }}>
                {renderRadioButton()}
            </div>
            <div style={{
                display: "flex",
                width: '324',
                justifyContent: 'space-between',
                
            }}>
                <Button title={'Save'} disabled={!checkValidate()}/>
                <Button title={'Reset'} onClick={setDefaultValue}/>
                <Button title={'Delete'} onClick={handlechangeTask}/>

            </div>

        </form>
    );
    
};
export default DetailTaskForm;