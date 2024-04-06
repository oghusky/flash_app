import { InputGroup, Form } from "react-bootstrap"

export default function PrependInput({ text, placeholder, ariaLabel, ariaDescribe, ...props }) {
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">{text}</InputGroup.Text>
            <Form.Control
                placeholder={placeholder}
                aria-label={ariaLabel}
                aria-describedby={ariaDescribe}
                {...props}
            />
        </InputGroup>
    )
}