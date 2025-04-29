import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const text = await request.json();
		// Process the webhook payload
	} catch (error) {
		return new Response(`Webhook error: ${(error as any).message}`, {
			status: 400,
		});
	}

	return new Response('Success!', {
		status: 200,
	});
}

export async function POST(request: NextRequest) {
	try {
		const text = await request.json();
		// Process the webhook payload
	} catch (error) {
		return new Response(`Webhook error: ${(error as any).message}`, {
			status: 400,
		});
	}

	return new Response('Success!', {
		status: 200,
	});
}

export async function PUT(request: NextRequest) {
	try {
		const text = await request.json();
		// Process the webhook payload
	} catch (error) {
		return new Response(`Webhook error: ${(error as any).message}`, {
			status: 400,
		});
	}

	return new Response('Success!', {
		status: 200,
	});
}

export async function DELETE(request: NextRequest) {
	try {
		const text = await request.json();
		// Process the webhook payload
	} catch (error) {
		return new Response(`Webhook error: ${(error as any).message}`, {
			status: 400,
		});
	}

	return new Response('Success!', {
		status: 200,
	});
}
