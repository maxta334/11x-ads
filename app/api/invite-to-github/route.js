import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json(
        { message: 'GitHub username is required' },
        { status: 400 }
      );
    }

    const githubToken = process.env.GITHUB_ACCESS_TOKEN;
    const orgName = process.env.GITHUB_ORG_NAME;

    if (!githubToken || !orgName) {
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // First, get the user's GitHub ID
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${githubToken}`,
        },
      }
    );

    const userData = await userResponse.json();

    if (!userResponse.ok) {
      throw new Error(userData.message || 'GitHub user not found');
    }

    // Check if user is already a member
    const membershipResponse = await fetch(
      `https://api.github.com/orgs/${orgName}/members/${username}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${githubToken}`,
        },
      }
    );

    if (membershipResponse.status === 204) {
      return NextResponse.json(
        { message: 'User is already a member of the organization' },
        { status: 400 }
      );
    }

    // Check for existing pending invitation
    const pendingInvitationsResponse = await fetch(
      `https://api.github.com/orgs/${orgName}/invitations`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${githubToken}`,
        },
      }
    );

    const pendingInvitations = await pendingInvitationsResponse.json();
    
    if (!pendingInvitationsResponse.ok) {
      throw new Error('Failed to check pending invitations');
    }

    const existingInvitation = pendingInvitations.find(
      invite => invite.invitee.id === userData.id
    );

    if (existingInvitation) {
      return NextResponse.json(
        { 
          message: 'User already has a pending invitation',
          details: {
            username: username,
            userId: userData.id,
            inviteUrl: existingInvitation.html_url
          }
        },
        { status: 400 }
      );
    }

    // If no existing invitation or membership, send new invitation
    const inviteResponse = await fetch(
      `https://api.github.com/orgs/${orgName}/invitations`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${githubToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invitee_id: userData.id,
          role: 'direct_member',
        }),
      }
    );

    const inviteData = await inviteResponse.json();

    if (!inviteResponse.ok) {
      throw new Error(inviteData.message || 'Failed to send GitHub invitation');
    }

    return NextResponse.json(
      { 
        message: 'Invitation sent successfully',
        details: {
          username: username,
          userId: userData.id,
          inviteUrl: inviteData.html_url
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GitHub invitation error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to send invitation' },
      { status: 500 }
    );
  }
} 