import { useSelector } from "react-redux"

const Profile = () => {
  const { currentUser } = useSelector(state => state.user)
  return (
    <div className="p-2 max-w-lg mx-auto ">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser.result.avatar} className="rounded-full w-24 h-24 object-cover cursor-pointer self-center " alt="profile" />
        <input type="text" placeholder="username" className="border p-3 rounded-lg " id="username" />
        <input type="email" placeholder="email" className="border p-3 rounded-lg " id="email" />
        <input type="password" placeholder="password" className="border p-3 rounded-lg " id="password" />
        <input type="password" placeholder="confirm Password" className="border p-3 rounded-lg " id="cPassword" />
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
