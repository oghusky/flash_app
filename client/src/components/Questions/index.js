import { useContext } from 'react';
import { Link } from 'react-router-dom';
// API
import API from '../API/API';
// context
import AppContext from '../../store/AppContext';
export default function Question({ item }) {
    const { jwt, setQuestions, setAppMsg } = useContext(AppContext);
    const handleDelete = async id => {
        try {
            const response = await API.deleteQuestion(id, jwt)
            if (response.status === 200) {
                const newQuestions = await API.getQuestions(jwt);
                setQuestions(newQuestions.data.questions);
                setAppMsg({ show: true, variant: "success", text: "Question deleted!" });
            }
        } catch (e) {
            setAppMsg({ show: true, variant: "danger", text: "Unable to delete question. Try again." });
            console.log(e)
        }
    }
    return (
        <div key={item._id} className="p-3 question-item">
            <p className="mb-0"><b>{item.author.name.replace(/[^A-Z0-9]/ig, "_").split("__")[0].replace(/[^A-Z0-9]/ig, "").toUpperCase()}</b></p>
            <p className="mb-0"><small><i>{item.createdAt}</i></small></p>
            <p className="my-3 post-text p-2">{item.text}</p>
            <hr />
            <div className="d-flex justify-content-between">
                <Link to={`/questionid_${item._id}`}>
                    {item.comments.length} - {item.comments.length === 1 ? 'Comment' : 'Comments'}
                </Link>
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(item._id)}
                >DELETE
                </button>
            </div>
        </div>
    )
}
