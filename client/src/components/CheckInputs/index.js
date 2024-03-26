import { Form } from 'react-bootstrap';

export default function CheckInputs({ label, type, placeholder, name, onChange, value }) {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Check
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </Form.Group>
    )
}
