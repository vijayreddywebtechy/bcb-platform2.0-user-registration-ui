import VerificationLayout from "@/components/VerificationDashboard/shared/VerificationLayout"
import IdentityVerification from "@/components/VerificationDashboard/IdentityVerification"

type Props = {}

function page({ }: Props) {
    return (
        <VerificationLayout><IdentityVerification /></VerificationLayout>
    )
}

export default page