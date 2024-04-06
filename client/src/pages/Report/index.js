import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import TextInputs from '../../components/TextInputs';
import Buttons from '../../components/Buttons';
import AppContext from '../../store/AppContext';
import ReportAPI from '../../API/reports';
export default function Report() {
    const { report, setReport, jwt, setAppMsg } = useContext(AppContext);
    const navigate = useNavigate();
    const handleSubmitReport = async e => {
        e.preventDefault();
        try {
            if (report?.reason) {
                const res = await ReportAPI.createReport(report, jwt);
                setAppMsg({ show: true, variant: "success", text: "Report created" })
                if (res.status === 201) {
                    setReport({});
                    navigate("/");
                }
            } else setAppMsg({ show: true, variant: "danger", text: "You must enter a reason" })
        } catch (e) {
            return e.message
        }
    }
    const handleUserInputChange = (event) => {
        const { name, value } = event.target;
        setReport({ ...report, [name]: value })
    }
    return (
        <Form onSubmit={handleSubmitReport}>
            <TextInputs
                type={"text"}
                label={"Enter reason"}
                placeholder={"Reason"}
                name={"reason"}
                value={report.reason}
                onChange={handleUserInputChange}
            />
            <Buttons
                type="submit"
                btnText={"Report"}
                variant={"danger"}
                className={"w-100 my-3"}
            />
        </Form>
    );

}