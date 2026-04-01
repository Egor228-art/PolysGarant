'use client'

import { useSession } from 'next-auth/react'

export default function UserInfo() {
  const { data: session } = useSession()

  return (
    <div className="header-contacts">
      <div className="phone">8-800-555-35-35</div>
      <div className="work-time">Ежедневно 9:00-21:00</div>
      {session?.user && (
        <div className="user-badge">
          👤 {session.user.name || session.user.email.split('@')[0]}
        </div>
      )}
    </div>
  )
}