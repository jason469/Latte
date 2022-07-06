export function CheckFormOutcome(status, resetForm, setFormOutcome) {
    switch (status) {
        case 200:
        case 201:
            resetForm({values: ''})
            setFormOutcome('created');
            break;
        case 406:
            resetForm({values: ''})
            setFormOutcome('already created');
            break;
        default:
            resetForm({values: ''})
            setFormOutcome('cannot be created');
            break;
    }
    return null
}