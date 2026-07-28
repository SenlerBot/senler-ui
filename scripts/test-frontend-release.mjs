import assert from 'node:assert/strict';
import {
  configureFrontendRelease,
  getFrontendReleaseSnapshot,
  shouldSuppressOutdatedFrontendError,
  syncFrontendRelease,
} from '../dist/frontend-release.js';

const originalFetch = globalThis.fetch;

try {
  configureFrontendRelease({
    appName: 'test-frontend',
    currentVersion: '2026.07.28.120000',
    currentRelease: 'test-frontend@1111111111111111111111111111111111111111',
    manifestUrl: 'https://example.test/version.json',
  });

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        version: '2026.07.28.130000',
        release: 'test-frontend@2222222222222222222222222222222222222222',
      }),
      { status: 200 },
    );

  const outdatedSnapshot = await syncFrontendRelease({ force: true });
  assert.equal(outdatedSnapshot.state, 'outdated');
  assert.equal(
    await shouldSuppressOutdatedFrontendError('ApiValidationError'),
    true,
  );
  assert.equal(await shouldSuppressOutdatedFrontendError('TypeError'), false);

  configureFrontendRelease({
    appName: 'test-frontend',
    currentVersion: '2026.07.28.130000',
    currentRelease: 'test-frontend@2222222222222222222222222222222222222222',
    manifestUrl: 'https://example.test/version.json',
  });

  const currentSnapshot = await syncFrontendRelease({ force: true });
  assert.equal(currentSnapshot.state, 'current');
  assert.equal(getFrontendReleaseSnapshot().latestVersion, '2026.07.28.130000');
  assert.equal(
    await shouldSuppressOutdatedFrontendError('ApiValidationError'),
    false,
  );
} finally {
  globalThis.fetch = originalFetch;
}

console.log('frontend release monitoring: ok');
