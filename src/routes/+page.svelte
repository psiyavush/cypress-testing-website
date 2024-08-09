<script>
	import { page } from '$app/stores';
	import ArticleList from '$lib/ArticleList/index.svelte';
	import Pagination from './Pagination.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	$: p = +($page.url.searchParams.get('page') ?? '1');
	$: tag = $page.url.searchParams.get('tag');
	$: tab = $page.url.searchParams.get('tab') ?? 'all';
	$: page_link_base = tag ? `tag=${tag}` : `tab=${tab}`;
</script>

<svelte:head>
	<title>Cypress Testing Website</title>
	<meta name="description" content="A site for learning automated testing with the web application testing tool, Cypress.">
	<meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"/>
	<link rel="canonical" href="https://cypress-testing-website.vercel.app/" />
</svelte:head>

<div class="home-page">
	{#if !data.user}
		<div class="banner">
			<div class="container">
				<h1 class="logo-font">Website for Testing with Cypress</h1>
				<p>A place where you can enhance your knowledge.</p>
			</div>
		</div>
	{/if}

	<div class="container page">
		<div class="row">
			<div class="col-md-9">
				<div class="feed-toggle">
					<ul class="nav nav-pills outline-active">
						<li class="nav-item">
							<a href="/?tab=all" class="nav-link" class:active={tab === 'all' && !tag}>
								Global Feed
							</a>
						</li>

						{#if data.user}
							<li class="nav-item">
								<a href="/?tab=feed" class="nav-link" class:active={tab === 'feed'}>Your Feed</a>
							</li>
						{:else}
							<li class="nav-item">
								<a href="/login" class="nav-link">Sign in to see your Feed</a>
							</li>
						{/if}

						{#if tag}
							<li class="nav-item">
								<a href="/?tag={tag}" class="nav-link active">
									<i class="ion-pound" />
									{tag}
								</a>
							</li>
						{/if}
					</ul>
				</div>

				<ArticleList articles={data.articles} />
				<Pagination pages={data.pages} {p} href={(p) => `/?${page_link_base}&page=${p}`} />
			</div>

			<div class="col-md-3">
				<div class="sidebar">
					<p>Popular Tags</p>
					<div class="tag-list">
						{#each data.tags as tag}
							<a href="/?tag={tag}" class="tag-default tag-pill">{tag}</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
