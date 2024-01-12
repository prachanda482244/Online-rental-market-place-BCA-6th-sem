import { useEffect, useState } from "react"
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'


const ShowListings = () => {
    SwiperCore.use([Navigation])

    const [listing, setListing] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const { listingId } = params
    useEffect(() => {
        const getListing = async () => {
            try {
                setLoading(true)
                const { data } = await axios({
                    method: 'get',
                    url: `/api/v1/listing/getOneListing/${listingId}`
                })
                if (data.success === false) {
                    setError(true)
                    setLoading(false)

                    return
                }
                setLoading(false)
                setListing(data?.result)
            } catch (error) {
                setLoading(false)
                setError(true)
            }
        }
        getListing()
    }, [listingId])
    return (
        <main>
            {loading && <p className="text-center my-7 text-2xl ">Loading...</p>}
            {error && <p className="text-center my-7 text-2xl ">Something went wrong.</p>}
            {
                listing && !loading && !error && (
                    <div>
                        <Swiper navigation>
                            {
                                listing.imageUrls.map((url) => (
                                    <SwiperSlide key={url}>
                                        <div className="h-[550px] " style={
                                            {
                                                background: `url(${url}) center no-repeat`,
                                                backgroundSize: 'cover'
                                            }
                                        }
                                        ></div>
                                    </SwiperSlide>
                                ))
                            }

                        </Swiper>
                    </div>
                )
            }
        </main>
    )
}

export default ShowListings
