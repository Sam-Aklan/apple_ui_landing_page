import { footerLinks } from "../constants"

const Footer = () => {
  return (
    <footer className="py-5 sm:px-10 px-5">
        <div className="screen-max-width">
            <div>
                <p className="font-semibold text-gray text-xs">
                    More Ways to shop:
                    <span className="undline text-blue">
                        {' '} Find an Apple Store {' '}
                    </span>
                    or
                    <span className="undline text-blue">
                        {' '} Other retailer {' '}
                    </span>
                    near you
                </p>
                <p className="font-semibold text-gray text-xs">
                    Or call 000770-030-1966
                </p>
            </div>
            <div className="bg-neutral-700 my-5 h-[1px]"/>
            <div className="flex md:flex-row flex-col md:items-center justify-between">
                <p className="font-semibold text-gray text-xs">
                    Copyright @ 2024 App Inc. All rights reserved.
                </p>
                <div className="flex">
                    {footerLinks.map((link,i)=>(
                        <p key={link} className="font-semibold text-gray text-xs">
                            {link}{' '}
                            {i !==footerLinks.length - 1 &&(
                                <span className="mt-2"> | </span>
                            )}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer