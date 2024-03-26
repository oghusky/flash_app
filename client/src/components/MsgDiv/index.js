import Alert from 'react-bootstrap/Alert';
export default function MsgDiv({ appMsg }) {
    return (
        <Alert className="text-center" show={appMsg.show} variant={appMsg.variant} >
            {appMsg.text}
        </Alert>
    )
}
