import classes from './TextError.module.css'

function TextError(props) {
    return (
        <div className={classes.error}>
            {props.children}
        </div>
    )
}

export default TextError