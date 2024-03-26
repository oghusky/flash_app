import { Button } from 'react-bootstrap';

export default function Buttons({ btnText, variant, btnAlign, ...props }) {
    return (
        <div className={btnAlign}>
            <Button variant={variant}
                {...props}
            >{btnText}</Button>
        </div>
    )
}