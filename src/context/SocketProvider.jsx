// import React, { useContext, useEffect, useState } from 'react'
// import io from 'socket.io-client'
// import { config } from '../config'
// import { useAuth } from './AuthProvider'
// const SocketContext = React.createContext()

// export function useSocket () {
//   return useContext(SocketContext)
// }

// export function SocketProvider ({ children }) {
//   const [socket, setSocket] = useState(null)
//   const { token } = useAuth()

//   const setupSocket = () => {
//     if (token && !socket) {
//       const newSocket = io(config.API_URL, { auth: { token } })

//       newSocket.on('disconnect', () => {
//         setSocket(null)
//         // setTimeout(setupSocket, 3000)
//         console.log('socket disconnected')
//       })
//       newSocket.on('connection', () => {
//         console.log('socket connected')
//       })
//       setSocket(newSocket)
//     }
//   }
//   useEffect(() => {
//     setupSocket()
//     return () => socket?.disconnect()
//   }, [])

//   console.log({ token })

//   return (
//     <SocketContext.Provider value={socket}>
//       {children}
//     </SocketContext.Provider>
//   )
// }
