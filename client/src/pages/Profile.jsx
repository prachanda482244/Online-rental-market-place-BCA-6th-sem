import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import axios from 'axios'
import { app } from '../firebase'
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice"
const Profile = () => {
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [show, setIsShow] = useState(false)
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(false)


  const dispatch = useDispatch()
  const fileRef = useRef(null)
  const { currentUser, loading, error } = useSelector(state => state.user)
  // Fire base storage rules update
  // allow read;
  // allow write :if
  // request.resource.size <2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    handleFileUpload(file)
    // eslint-disable-next-line
  }, [file])

  const handleFileUpload = (file) => {
    if (!file || !file.name) {
      console.error("Invalid file object or missing 'name' property");
      return;
    }
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setFilePerc(Math.round(progress))
    },
      error => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({ ...formData, avatar: downloadURL })
        )
      }
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      console.log(currentUser.result._id)
      const { data } = await axios({
        method: 'post',
        url: `/api/v1/userInfo/update/${currentUser.result._id}`,
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(formData)
      })
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
      setUserUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }
  return (
    <div className="p-2 max-w-lg mx-auto ">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setFile(e.target.files[0])} />

        <img src={formData?.avatar || currentUser.result?.avatar} onClick={() => fileRef.current.click()} className="rounded-full w-24 h-24 object-cover cursor-pointer self-center " alt="profile" />
        <p className="text-sm self-center">
          {
            fileUploadError ?
              <span className="text-red-900">Image upload error</span>
              :
              filePerc > 0 && filePerc < 100 ? (
                <span className="text-gray-700">{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span className="text-green-700">Image Upload Successfuly</span>
              ) : ""
          }
        </p>

        <input type="text" placeholder="username" className="border p-3 rounded-lg " id="username" defaultValue={currentUser.result.username}
          onChange={handleChange}
        />
        <input type="email" placeholder="email" className="border p-3 rounded-lg " id="email" defaultValue={currentUser.result.email}
          onChange={handleChange}
        />
        <div className='flex relative'>
          <input type={show ? 'text' : 'password'} id='password' placeholder='password' onChange={handleChange} className='border p-3 rounded-lg w-full' />
          <input type='checkbox' className='w-[20px] h-[20px] absolute right-4 top-4 rounded-lg cursor-pointer' onClick={() => setIsShow(!show)} />
        </div>

        {/* <input type="password" placeholder="confirm Password" className="border p-3 rounded-lg " id="cPassword" /> */}
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg px-3 py-4 uppercase hover:opacity-90 disabled:opacity-80">{loading ? 'Loading...' : 'Update'}</button>
      </form>
      <div className="flex justify-between mt-2">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-700">{error ? error : ''}</p>
      <p className="text-green-700 text-center ">{userUpdateSuccess ? 'User update succesfully' : ''}</p>
    </div>
  )
}

export default Profile
