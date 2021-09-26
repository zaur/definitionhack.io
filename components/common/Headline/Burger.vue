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
  --burger-size: 20px;

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
			width: var(--burger-size);
			height: var(--burger-size);
      border-radius: 50%;
      background: clr(light);
		}

		&__line,
		&__icon::before,
		&__icon::after {
			content: '';
			position: absolute;
			left: calc(var(--burger-size) / 4);
			width: calc(var(--burger-size) / 2);
			height: 2px;
			border-radius: 2px;
			background: clr(dark);
			transition: transform 0.25s ease-out, background 0.25s ease-out;
		}

		&__line {
			&:first-child {
				top: calc(var(--burger-size) / 4);
			}

			&:last-child {
				bottom: calc(var(--burger-size) / 4);
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
    height: var(--burger-size);
    margin: 0 0 0 8px;
    font-size: 14px;
    line-height: var(--burger-size);
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
