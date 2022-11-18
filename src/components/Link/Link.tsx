import * as React from 'react'

import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { useRouter } from 'next/router'

import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'
import clsx from 'clsx'

import { theme } from '../../styles/theme'

interface NextLinkComposedProps
	extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
		Omit<NextLinkProps, 'href' | 'as'> {
	to: NextLinkProps['href']
	linkAs?: NextLinkProps['as']
	href?: NextLinkProps['href']
}

export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
	function NextLinkComposed(props) {
		const { to, linkAs, replace, scroll, shallow, prefetch, locale, ...other } = props

		return (
			<NextLink
				href={to}
				prefetch={prefetch}
				as={linkAs}
				replace={replace}
				scroll={scroll}
				shallow={shallow}
				passHref
				locale={locale}
				{...other}
			/>
		)
	}
)

export type LinkProps = {
	activeClassName?: string
	as?: NextLinkProps['as']
	href: NextLinkProps['href']
	noLinkStyle?: boolean
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
	Omit<MuiLinkProps, 'href'>

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
	props,
	ref
) {
	const {
		activeClassName = 'active',
		as: linkAs,
		className: classNameProps,
		href,
		noLinkStyle,
		...other
	} = props

	const router = useRouter()
	const pathname = typeof href === 'string' ? href : href.pathname
	const className = clsx(classNameProps, {
		[activeClassName]: router.pathname === pathname && activeClassName
	})

	const isExternal =
		typeof href === 'string' &&
		(href.indexOf('http') === 0 || href.indexOf('mailto:') === 0)

	if (isExternal) {
		if (noLinkStyle) {
			return <a className={className} href={href} ref={ref} {...other} />
		}

		return (
			<MuiLink
				className={className}
				href={href}
				ref={ref}
				sx={{ color: theme.text.link }}
				{...other}
			/>
		)
	}

	if (noLinkStyle) {
		return <NextLinkComposed className={className} ref={ref} to={href} {...other} />
	}

	return (
		<MuiLink
			component={NextLinkComposed}
			linkAs={linkAs}
			className={className}
			ref={ref}
			to={href}
			{...other}
		/>
	)
})

export default Link
