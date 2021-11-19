import React from 'react'

import { useRouter } from 'next/router'

import { JSX } from '@emotion/react/jsx-runtime'

import { useStoreon } from './useStoreon'

export const withAuth = (WrappedComponent: any) => {
	// eslint-disable-next-line react/display-name
	return (props: JSX.IntrinsicAttributes) => {
		if (typeof window !== 'undefined') {
			const Router = useRouter()
			const { token } = useStoreon('token')

			if (!token) {
				Router.replace('/')
				return null
			}

			return <WrappedComponent {...props} />
		}

		return null
	}
}

export default withAuth
