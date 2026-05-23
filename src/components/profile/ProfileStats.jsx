import { StatBadge } from '../user/StatBadge'
import { BookOpen, Users, UserPlus, Star } from 'lucide-react'

export function ProfileStats({ user, totalStars }) {
  if (!user) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fadeIn">
      <StatBadge icon={BookOpen} value={user.public_repos} label="Repositories" />
      <StatBadge icon={Users} value={user.followers} label="Followers" />
      <StatBadge icon={UserPlus} value={user.following} label="Following" />
      <StatBadge icon={Star} value={totalStars} label="Total Stars" />
    </div>
  )
}
