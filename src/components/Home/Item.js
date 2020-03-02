import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

const ListItem = styled.li(({ theme }) => ({
  flexBasis: '48%',
  maxWidth: 240,
  [theme.mq('medium')]: {
    flexBasis: '33.3%'
  },
  [theme.mq('xlarge')]: {
    flexBasis: '20%'
  }
}))

const LinkButton = styled(Link)(({ theme }) => ({
  display: 'block',
  padding: '7%',
  margin: '7%',
  background: theme.colors.grey[1],
  border: `2px solid ${theme.colors.grey[6]}`,
  borderRadius: '3px',
  position: 'relative',
  transition: 'color 0.11s, background-color 0.22s, box-shadow 0.22s',
  transitionDelay: '0.11s',
  '&:hover': {
    color: 'transparent',
    background: theme.colors.grey[6],
    boxShadow: `inset 0 0 0 6px ${theme.colors.grey[1]}`
  }
}))

const IconWrapper = styled.div({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  padding: '10px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: '0',
  transition: 'opacity .22s',
  '&:hover': {
    opacity: '1',
    transitionDelay: '0.11s'
  }
})

const Item = ({ name, url, icon: Icon }) => (
  <ListItem>
    <LinkButton to={`/${url}`} title={`${name} scores`}>
      {name}
      <IconWrapper>
        <Icon />
      </IconWrapper>
    </LinkButton>
  </ListItem>
)

export default Item
