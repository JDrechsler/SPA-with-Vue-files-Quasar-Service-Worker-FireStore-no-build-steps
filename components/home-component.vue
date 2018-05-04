<template>
	<q-layout view="hHr LpR lFf">
		<q-layout-header>
			<q-toolbar>
				<q-toolbar-title>
					Bill Tracker
				</q-toolbar-title>
			</q-toolbar>
		</q-layout-header>

		<q-page-container class='scroll-content'>
			<q-page>

				<button @click="enableNotifications">Notifications</button>

				<div v-if='billers.length > 0'>

					<!-- unpaid bills -->
					<div v-for="biller in billers" :key="biller.id">
						<div v-if='!biller.isPaid'>
							<card-comp :propbiller="biller"></card-comp>
						</div>
					</div>

					<hr>

					<!-- paid bills -->
					<div v-for="biller in billers" :key="biller.title">
						<div v-if='biller.isPaid'>
							<card-comp :propbiller="biller"></card-comp>
						</div>
					</div>

				</div>
				<div v-else>
					No bills to show right now.
				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
var config = {
	apiKey: "AIzaSyCJXGDc2kvyJSOSzu_hvhS64sHDnyKn_qE",
	authDomain: "billersapp.firebaseapp.com",
	databaseURL: "https://billersapp.firebaseio.com",
	projectId: "billersapp",
	storageBucket: "billersapp.appspot.com",
	messagingSenderId: "5384173140"
};

firebase.initializeApp(config);

module.exports = {
	components: {
		"card-comp": httpVueLoader("components/card-component.vue")
	},
	firestore() {
		return {
			billers: firebase
				.firestore()
				.collection("billers")
				.orderBy("dayOfMonth", "asc")
		};
	},
	data() {
		return {
			message: "Vuefire & Firestore"
		};
	},
	methods: {
		enableNotifications() {
			if ("Notification" in window) {

				Notification.requestPermission()
					.then(res => {
						console.log(res)
						if (res !== 'granted') {
							console.log('permission was denied for notifications')
							alert('denied...')
						} else {
							alert('notificiation permission granted')


							navigator.serviceWorker.ready.then(function (registration) {
								registration.showNotification('Vibration Sample', {
									body: 'Buzz! Buzz!',
									icon: '../images/touch/chrome-touch-icon-192x192.png',
									vibrate: [200, 100, 200, 100, 200, 100, 200],
									tag: 'vibration-sample'
								});
							});


						}
					})

			} else {
				alert("This browser does not support notifications, I am sorry :/")
				console.log('This browser does not support notifications :/')
			}
		},
		addBiller() {

			console.log("adding test biller");
			this.$firestore.billers.add({
				title: "Test new",
				amount: 0,
				isPaid: false,
				dayOfMonth: 2,
				imageUrl: ""
			});
		},
		deleteBiller(biller) {
			this.$firestore.billers.doc(biller[".key"]).delete();
		},
		presentAddModal() { },
		presentMoneyOverviewModal() { }
	}
};
</script>

<style lang='css'>
.scroll-content {
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	position: absolute;
	z-index: 1;
	display: block;
	overflow-x: hidden;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	will-change: scroll-position;
	contain: size style layout;
	background: linear-gradient(45deg, #6cfd9f, #6887ff);
}
</style>