import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
const Profile = () => {
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})

  console.log(formData);

  const fileRef = useRef(null)
  const { currentUser } = useSelector(state => state.user)
  console.log(currentUser.result)
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

  return (
    <div className="p-2 max-w-lg mx-auto ">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setFile(e.target.files[0])} />

        <img src={formData.avatar || currentUser.result.avatar} onClick={() => fileRef.current.click()} className="rounded-full w-24 h-24 object-cover cursor-pointer self-center " alt="profile" />
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

        <input type="text" placeholder="username" className="border p-3 rounded-lg " id="username" />
        <input type="email" placeholder="email" className="border p-3 rounded-lg " id="email" />
        <input type="password" placeholder="password" className="border p-3 rounded-lg " id="password" />
        {/* <input type="password" placeholder="confirm Password" className="border p-3 rounded-lg " id="cPassword" /> */}
        <button className="bg-slate-700 text-white rounded-lg px-3 py-4 uppercase hover:opacity-90 disabled:opacity-80">update</button>
      </form>
      <div className="flex justify-between mt-2">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}

export default Profile
