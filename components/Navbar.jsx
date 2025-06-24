// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { auth } from '@/lib/firebase';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { useRouter } from 'next/navigation';

// const Navbar = () => {
//   const router = useRouter();
//   const [user, setUser] = useState(null);

//   // ✅ Only run this after browser loads
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//         setUser(currentUser);
//       });

//       return () => unsubscribe();
//     }
//   }, []);

//   const handleLogout = async () => {
//     await signOut(auth);
//     router.push('/auth');
//   };

//   return (
//     <div className="flex items-center justify-between p-4 shadow-md bg-[#FAFAFA]">
//       <p className="cursor-pointer text-xl font-bold text-[#166F64]">Soul Circle</p>

//       <div className="hidden md:flex items-center gap-10">
//         <Link href="/" passHref>
//           <span className="cursor-pointer text-black hover:text-[#166F64] transition">Home</span>
//         </Link>
//         <Link href="/friends" passHref>
//           <span className="cursor-pointer text-black hover:text-[#166F64] transition">Find Friends</span>
//         </Link>
//         <Link href="/" passHref>
//           <span className="cursor-pointer text-black hover:text-[#166F64] transition">Forum</span>
//         </Link>
//         <Link href="/" passHref>
//           <span className="cursor-pointer text-black hover:text-[#166F64] transition">Resources</span>
//         </Link>
//         <Link href="/" passHref>
//           <span className="cursor-pointer text-black hover:text-[#166F64] transition">About</span>
//         </Link>
//       </div>

//       <div className="flex items-center gap-3">
//         {!user ? (
//           <button
//             onClick={() => router.push('/auth')}
//             className="px-6 py-2 bg-[#3566A0] text-[#FAFAFA] rounded-lg font-medium"
//           >
//             Login &rarr;
//           </button>
//         ) : (
//           <>
//             <Link href="/">
//               <button className="px-4 py-2 border border-[#3566A0] text-[#3566A0] rounded-lg font-medium">
//                 Dashboard
//               </button>
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium"
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;


'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Load initial user on mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // ✅ Listen for login/logout changes
    const handleUserChange = () => {
      const updatedUser = localStorage.getItem('currentUser');
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener('userChanged', handleUserChange);

    // ✅ Clean up on unmount
    return () => {
      window.removeEventListener('userChanged', handleUserChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.dispatchEvent(new Event('userChanged')); // 👈 notify others
    router.push('/');
  };

  return (
    <div className="flex items-center justify-between p-4 shadow-md bg-[#FAFAFA]">
      <p className="cursor-pointer text-xl font-bold text-[#166F64]">Soul Circle</p>

      <div className="hidden md:flex items-center gap-10">
        <Link href="/HomePage"><span className="cursor-pointer text-black hover:text-[#166F64] transition">Home</span></Link>
        <Link href="/friends"><span className="cursor-pointer text-black hover:text-[#166F64] transition">Find Friends</span></Link>
        <Link href="/"><span className="cursor-pointer text-black hover:text-[#166F64] transition">Forum</span></Link>
        <Link href="/"><span className="cursor-pointer text-black hover:text-[#166F64] transition">Resources</span></Link>
        <Link href="/"><span className="cursor-pointer text-black hover:text-[#166F64] transition">About</span></Link>
      </div>

      <div className="flex items-center gap-3">
        {!user ? (
          <button
            onClick={() => router.push('/HomePage')}
            className="px-6 py-2 bg-[#3566A0] text-[#FAFAFA] rounded-lg font-medium"
          >
            Login &rarr;
          </button>
        ) : (
          <>
            <Link href="/">
              <button className="cursor-pointer px-4 py-2 border border-[#3566A0] text-[#3566A0] rounded font-medium">
                <FaUser/>
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium cursor-pointer"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
