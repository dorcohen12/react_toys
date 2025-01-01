import { useEffect, useRef, useState } from "react"
import { teamMemberService } from "../services/team-member.service"
import { TeamMemberList } from "./TeamMemberList"


export default function AboutTeam() {

    const nextIdx = useRef(0)
    const bottomDiv = useRef()

    const [teamMembers, setTeamMembers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            const entry = entries[0]
            if (entry.isIntersecting) {
                loadTeamMembers()
            }
        }, { threshold: 1, rootMargin: '40px' })

        observer.observe(bottomDiv.current)
    }, [])

    async function loadTeamMembers() {
        setIsLoading(true)
        try {
            const nextTeamMembers = await teamMemberService.query({ startIdx: nextIdx.current++ })
            setTeamMembers(prevTeamMembers => [...prevTeamMembers, ...nextTeamMembers])
        } catch (error) {
            console.log('error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="about-team">
            <h1>Our team is</h1>
            <TeamMemberList teamMembers={teamMembers} />
            {isLoading && <div className="loading-container"><img className="loading" src="https://media.tenor.com/axAeNjNIUBsAAAAC/spinner-loading.gif" /></div>}
            <div ref={bottomDiv} className='bottom-div'></div>
        </section>
    )
}

