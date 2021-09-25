<template>
	<div class="burger" role="button" @click="handleClick">
		<div class="burger__icon">
			<div class="burger__line"></div>
			<div class="burger__line"></div>
		</div>
    <div class="burger__label">
      <span class="burger__text">Menu<br>Close</span>
    </div>
	</div>
</template>

<script>
export default {
  name: 'Burger',

  watch: {
    '$route': {
      deep: true,
      handler () {
        document.body.classList.remove('page-nav-open');
      }
    }
  },

	methods: {
    handleClick () {
			if (document.body.classList.contains('page-nav-open')) {
				document.body.classList.remove('page-nav-open');
			} else {
				document.body.classList.add('page-nav-open');
			}
		},
	},
};
</script>

<style lang="scss">
@import "~@/styles/system.scss";

.burger {
	display: none;

	@include display-less(desktop) {
    flex: 0 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		z-index: 100;
		top: 0;
		right: 0;
		bottom: 0;
    margin-right: var(--gap);
		cursor: pointer;

		&__icon {
			position: relative;
			width: 20px;
			height: 20px;
      border-radius: 50%;
      background: clr(light);
		}

		&__line,
		&__icon::before,
		&__icon::after {
			content: '';
			position: absolute;
			left: 5px;
			width: 10px;
			height: 2px;
			border-radius: 2px;
			background: clr(dark);
			transition: transform 0.25s ease-out, background 0.25s ease-out;
		}

		&__line {
			&:first-child {
				top: 5px;
			}

			&:last-child {
				bottom: 5px;
			}

			.page-nav-open & {
				transform: scaleX(0);
			}
		}

		&__icon::before,
		&__icon::after {
			z-index: 499;
			top: calc(50% - 1px);
		}

		.page-nav-open & {
			&__icon::before {
				transform: rotate(-45deg);
			}

			&__icon::after {
				transform: rotate(45deg);
			}
		}
	}

  &__label {
    overflow: hidden;
    height: 20px;
    margin: 0 0 0 8px;
    font-size: 14px;
    line-height: 20px;
    color: clr(text);

    .page-nav-open & {
      color: clr(light);
    }
  }

  &__text {
    position: relative;
    top: 1px;

    .page-nav-open & {
      top: -19px;
    }
  }
}
</style>
