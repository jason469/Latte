export function CheckFormOutcome(status, setFormOutcome, resetForm = null) {
    if (status === 200) {
        setFormOutcome('updated')
    } else if (status === 201) {
        setFormOutcome('created');
    } else if (status === 406) {
        setFormOutcome('already created');
    } else {
        setFormOutcome('cannot be created');
    }

    if (resetForm) {
        resetForm({values: ''})
    }

    return null
}