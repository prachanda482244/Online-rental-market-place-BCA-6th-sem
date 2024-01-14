import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
    const [landLord, setLandLord] = useState(null)
    const [message, setMessage] = useState('')
    const id = listing.userRef

    const handleChange = (e) => setMessage(e.target.value)
    useEffect(() => {
        const fetchLandLord = async () => {
            try {
                const { data } = await axios({
                    method: 'get',
                    url: `/api/v1/listing/contactLandLord/${id}`
                })
                setLandLord(data?.result)
            } catch (error) {
                console.log(error)

            }
        }
        fetchLandLord()
    }, [id])
    return (
        <div>
            {
                landLord && (
                    <div
                        className="flex flex-col gap-2"
                    >
                        <p>
                            Contact
                            <span className="font-semibold">
                                {landLord.username}
                            </span>
                            for
                            <span className="font-semibold">
                                {listing?.name.toLowerCase()}
                            </span>
                        </p>
                        <textarea
                            name="message"
                            id="message"
                            value={message}
                            placeholder="Enter your message here"
                            className="w-full border p-3 rounded-lg"
                            onChange={handleChange}
                            rows="2"></textarea>

                        <Link
                            to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`}
                            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
                        >Send Message</Link>
                    </div>
                )
            }
        </div>
    )
}

export default Contact
