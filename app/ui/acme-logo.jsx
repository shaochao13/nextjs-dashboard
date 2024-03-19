import { GlobeAltIcon } from "@heroicons/react/24/outline"

const AcmeLogo = () => {
  return (
    <div className="flex flex-row items-center leading-none text-white">
      <GlobeAltIcon className="h-12 h-12 rotate-[15deg]" />

      <p className="text-[44px]">Acme</p>
    </div>
  )
}

export default AcmeLogo
