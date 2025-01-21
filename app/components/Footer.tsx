import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
<footer className="bg-white border-t font-body border-gray-200 py-6">
          <div className="container mx-auto flex font-body justify-center items-center px-4">
            <div className="text-base font-medium font-body text-gray-700 text-center">
              Windsor, London, Toronto |{' '}
              <a href="mailto:fashamifatemeh@gmail.com" className="hover:text-green-600 font-body transition">
                fashamifatemeh@gmail.com
              </a>{' '}
              |{' '}
              <a href="tel:2267596075" className="hover:text-green-600 font-body transition">
                Tel: 226-759-6075
              </a>
              <Link href="/privacypolicy" className="hover:text-green-600 ml-5 font-body transition">
                    PrivacyPolicy
          </Link>
            </div>
          </div>
</footer>
  )
}

export default Footer
