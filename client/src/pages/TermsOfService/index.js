import Container from 'react-bootstrap/Container';
export default function TermsOfService() {
    return (
        <Container>
            <h2>Terms of service (will be updated over time)</h2>
            <p className='mb-1 p-0'><b>06/04/2024</b></p>
            <p className='mt-1 p-0'>
                Currently as of the launch of this application the only
                information we collect that you haven't voluntarily given is your
                IP Address. Why are we getting that information? Because unfortunately sometimes
                there are bad actors and we need to be able to keep those actors from using our platform
                and one of the easy ways is to block their IP address.
            </p>
        </Container>
    )
}