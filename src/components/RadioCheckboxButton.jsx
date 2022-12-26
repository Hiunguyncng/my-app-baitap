const RadioCheckboxButton = ({
    radioCheckboxClass,
    title,
    type,
    style,
    onClick,
    name,
    disabled,
    isChecked,
    value,
})=>{
    return(
        <div className={`radioCheckboxClass` }
            style={{
                ...style,
                cursor: disabled ? 'not-allowed' : 'pointer'
            }}
            >
            <input type={type} checked={isChecked} name={name} disabled={disabled} value={value} onClick={onClick} />
            <span/>
            <label htmlFor={name}>{title}</label>
        </div>
    )
}
export default RadioCheckboxButton;