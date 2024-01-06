import React from 'react'

const CreateListing = () => {
    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className="text-3xl font-semibold text-center my-7">Create A listing</h1>
            <form className='flex flex-col sm:flex-row   gap-4'>
                <div className="flex flex-col  gap-4 flex-1">
                    <input type="text" name="name" id="name" placeholder='name' maxLength={62} minLength={10} className="border p-3 rounded-lg" required />
                    <textarea type="text" name="description" id="description" placeholder='description' maxLength={62} minLength={10} className="border p-3 rounded-lg" required />
                    <input type="text" name="address" id="address" placeholder='address' className="border p-3 rounded-lg" required />

                    <div className="flex gap-6 flex-wrap ">
                        <div className="flex gap-2">
                            <input type="checkbox" name="sale" id="sale" className='w-5 ' />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" name="rent" id="rent" className='w-5 ' />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" name="parking" id="parking" className='w-5 ' />
                            <span>Parking spot</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" name="furnished" id="furnished" className='w-5 ' />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" name="sale" id="sale" className='w-5 ' />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6 ">
                        <div className="flex items-center gap-2">
                            <input type="number" name="bedrooms" id="bedrooms" min='1' max='10' className='p-3 border border-gray-300 rounded-lg' required />
                            <p className='p-3 border border-gray-300 rounded-lg' >Beds</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" name="bathrooms" id="bathrooms" min={1} max={10} required className='p-3 border border-gray-300 rounded-lg' />
                            <p className='p-3 border border-gray-300 rounded-lg' >Baths</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="number" name="regularPrice" id="regularPrice" min={1} max={10} required className='p-3 border border-gray-300 rounded-lg' />
                            <div className="flex flex-col items-center">
                                <p className='p-3 border border-gray-300 rounded-lg mt-3' >Regular Price</p>
                                <span className='text-xs'>($ / month)</span>
                            </div>
                        </div>

                        <div className="flex items-center  gap-2">
                            <input type="number" name="discountPrice" id="discountPrice" min={1} max={10} required className='p-3 border border-gray-300 rounded-lg' />
                            <div className="flex flex-col items-center">
                                <p className='p-3 border border-gray-300 rounded-lg mt-3' >Discount Price</p>
                                <span className='text-xs'>($ / month)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-4">
                    <p className="font-semibold">Images:
                        <span className="font-normal text-gray-600 ml-2">The first image will be cover (max 6)</span>
                    </p>
                    <div className="flex gap-4">
                        <input className='p-3 border border-gray-300 rounded w-full' type="file" name="images" id="images" accept='image/*' multiple />
                        <button className="p-3 text-green-700 border border-green-700 rounded  uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
                    </div>
                    <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
                </div>
            </form>
        </main>
    )
}

export default CreateListing
