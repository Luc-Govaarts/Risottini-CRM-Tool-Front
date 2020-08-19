import React from 'react'

export default function ContactCard(props) {
	const contact = props.contact
	return <div>{contact.name}</div>
}
